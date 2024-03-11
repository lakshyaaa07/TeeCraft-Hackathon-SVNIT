import express from 'express';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});

router.route('/').get((req, res) => {
    res.status(200).json({ message: "Hello from DALL.E ROUTES" })
});

router.route('/').post(async (req, res) => {
    try {
        const { prompt } = req.body;

        const response = await openai.images.generate({
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json'
        });

        console.log("Response:", response);

        if (response && response.data && Array.isArray(response.data) && response.data.length > 0) {
            const imageBase64JSON = response.data[0].b64_json;
            try {
                const imageData = JSON.parse(imageBase64JSON); // Parse the JSON string
                if (imageData && imageData.b64) {
                    const imageBase64 = imageData.b64; // Extract the base64 encoded image data
                    res.status(200).json({ photo: imageBase64 });
                } else {
                    console.error("Invalid image data format");
                    res.status(500).json({ message: "Invalid image data format" });
                }
            } catch (parseError) {
                console.error("Failed to parse JSON:", parseError);
                res.status(500).json({ message: "Failed to parse JSON" });
            }
        } else {
            console.error("Invalid response format");
            res.status(500).json({ message: "Invalid response format" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});

export default router;
