const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

const inventoryData = [
  { id: 1, model: "T5075 PS/C", imageKey: "18zpo-qXDZIm6emvuyLJDq767WT1U3zRz" },
  { id: 2, model: "T130", imageKey: "1YfvHvbWBA9e9CYAxXEJlp_P1hZu6YLfM" },
  { id: 3, model: "T474 S/C", imageKey: "1mRtsC9B5VUsdDvLuLIUlFIaUaF550Su2" },
  { id: 4, model: "T474 HST", imageKey: "1APKsv-maVCSE0QCA0TaRAO5Z_zWG57Af" },
  { id: 5, model: "T474 BH", imageKey: "17DNVOjlBe1FLK4BbyGHT3krdQ88p3zqi" },
  { id: 6, model: "T115", imageKey: "1WkYiYNyIqhmyB4CzRiY9_rrLlYN6KRp0" },
  { id: 7, model: "T474 S", imageKey: "1nQKo8_PR48qAeHtroVo1_YOAdGp-kTah" },
  { id: 8, model: "T574", imageKey: "1HBT1TgNIw2KN3p4MI1i2JHzjOOceJmNB" },
  { id: 9, model: "T458 PU/BH", imageKey: "1wMW2tIrhGp20PYM3kZlHz6p4Fno7UoTf" },
  { id: 10, model: "T3035 HST", imageKey: "15AwjSUIjbr6w6Uom3zZObxjZbIqrvT3F" },
  { id: 11, model: "T25 HST/BH", imageKey: "1plV7OMbz8RY9tkSoe9zPsr57cjGqtgOp" },
  { id: 12, model: "T574 S", imageKey: "18gWTWFDwyIw-frS_36RUBRP7ZrC7oORk" },
  { id: 13, model: "T25 HST", imageKey: "1dUcEQWJhVr37mFRYMzVaqxixrPDW1X4J" },
  { id: 14, model: "T474 HST/C", imageKey: "1A4BCBUbPg0qXs_hnaflErUuQHm_mJLs7" },
  { id: 15, model: "T574 HST/C", imageKey: "1Cv6BDr9XyeaiJ5KchfmO9w9ASsaTBvHq" },
  { id: 16, model: "T3035 S", imageKey: "1iX03OlKsgE9cKwCgR1NUkKAVdIff8zEv" },
  { id: 17, model: "T494 HST", imageKey: "1XhDm7ooFeSNHDLxsIQ40akadFf-aiRIo" },
  { id: 18, model: "T494 HST/C", imageKey: "1Me2Un1EvV1IyQY8SWST3u6QV-PM3WgwR" },
  { id: 19, model: "T494 S/C", imageKey: "14k8GxuJ-YG5GOKNiXXAvT0RFnHwyB4g6" },
  { id: 20, model: "T3025 HST/C", imageKey: "1UW4YI_oIt-fuiEMvj4SVpsoBNpJUz2W-" },
  { id: 21, model: "T4058 PS", imageKey: "1jkcMWk-9i_w_q7ir9OYClUNu1vD4ZtHK" }
];

const targetDir = path.join(__dirname, 'public', 'tractors');

async function downloadImages() {
  await fs.ensureDir(targetDir);

  for (const item of inventoryData) {
    const url = `https://lh3.googleusercontent.com/d/${item.imageKey}`;
    const filePath = path.join(targetDir, `${item.id}.jpg`);

    try {
      console.log(`Downloading image for ${item.model}...`);
      const response = await axios({
        method: 'GET',
        url: url,
        responseType: 'stream'
      });

      const writer = fs.createWriteStream(filePath);
      response.data.pipe(writer);

      await new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
      });
      console.log(`Saved ${item.model} to ${filePath}`);
    } catch (error) {
      console.error(`Failed to download ${item.model}:`, error.message);
    }
  }
}

downloadImages().then(() => console.log('Done!')).catch(console.error);
