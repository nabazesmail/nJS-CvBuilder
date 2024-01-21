// controller/personalInfoController.js
const express = require("express");
const router = express.Router();
const personalInfoService = require("../services/personalInfoServices");
const userService = require("../services/userServices");
const authenticate = require("../middleware/authenticate").authenticate;
const upload = require("../config/multer");
const storage = require("../config/appwriteConfig"); // Import the Appwrite storage configuration
const { InputFile } = require("node-appwrite"); // Import InputFile

//below this Route all routes are authenticated
router.use(authenticate);

router.post('/:userId/picture', upload.single('profilePicture'), async (req, res) => {
  const userId = req.params.userId;

  try {
    const file = req.file;
    if (!file) {
      return res.status(400).send({ message: 'No file uploaded' });
    }

    const inputFile = InputFile.fromBuffer(file.buffer, file.originalname);
    const profilePicBucketId = '65ad34f6d46fbbe5a0ed';

    let result;
    try {
      result = await storage.createFile(
        profilePicBucketId,
        'unique()',
        inputFile,
        [], // Update permissions as required
        [],
        file.originalname
      );
    } catch (uploadError) {
      if (uploadError.message.includes("onProgress is not a function")) {
        const listResponse = await storage.listFiles(profilePicBucketId);
        // Check if listResponse contains the files array and use it
        const filesArray = listResponse.files ? listResponse.files : [];
        const uploadedFile = filesArray.find(f => f.name === file.originalname);
        result = uploadedFile ? { $id: uploadedFile.$id } : { $id: 'fallback-file-id' };
      } else {
        throw uploadError;
      }
    }

    const updatedPersonalInfo = await personalInfoService.updatePersonalInfo(userId, {
      profilePicture: result.$id,
      profilePictureName: file.originalname
    });

    res.status(200).send({ message: "Profile picture uploaded successfully", data: updatedPersonalInfo });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).send({ message: "Error uploading file", error: error.message });
  }
});

router.get("/:userId/picture", async (req, res) => {
  try {
    const userId = req.params.userId;
    const personalInfo = await personalInfoService.getPersonalInfoByUserId(
      userId
    );

    if (!personalInfo || !personalInfo.profilePicture) {
      return res.status(404).json({ message: "Profile picture not found" });
    }

    // Construct the URL for the profile picture
    const profilePicUrl = `https://cloud.appwrite.io/v1/storage/buckets/65ad34f6d46fbbe5a0ed/files/${personalInfo.profilePicture}/view?project=65ac3494f0464a89a376&mode=admin`;

    res.status(200).json({ profilePictureUrl: profilePicUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Check if the user exists
    const userExists = await userService.getUserById(userId);
    if (!userExists) {
      return res.status(400).json({ error: "User does not exist" });
    }

    const newPersonalInfo = await personalInfoService.createPersonalInfo({
      userId: userId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
    });

    res.json(newPersonalInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const personalInfos = await personalInfoService.getPersonalInfos();
    res.json(personalInfos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const personalInfo = await personalInfoService.getPersonalInfoById(
      req.params.id
    );
    if (!personalInfo) {
      return res.status(404).json({ message: "Personal info not found" });
    }
    res.json(personalInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedPersonalInfo = await personalInfoService.updatePersonalInfo(
      req.params.id,
      req.body
    );
    res.json(updatedPersonalInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedPersonalInfo = await personalInfoService.deletePersonalInfo(
      req.params.id
    );
    res.json(deletedPersonalInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
