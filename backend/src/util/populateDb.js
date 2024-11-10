const Category = require("../models/Category");
const Product = require("../models/product");

const populateCategories = async () => {
  const categories = [
    { name: "Smartphones" },
    { name: "Laptops" },
    { name: "Tablets" },
    { name: "Televisions" },
    { name: "Smartwatches" },
    { name: "Headphones" },
    { name: "Gaming Consoles" },
    { name: "Monitors" },
    { name: "Printers" },
    { name: "Drones" },
  ];

  for (const category of categories) {
    try {
      const newCategory = new Category(category);
      await newCategory.save();
    } catch (error) {
      console.error("Błąd podczas zapisywania kategorii: ", error);
    }
  }
};

const populateProducts = async () => {
  const smartphonesCategoryId = (
    await Category.findOne({ name: "Smartphones" })
  )._id;
  const laptopsCategoryId = (await Category.findOne({ name: "Laptops" }))._id;
  const tabletsCategoryId = (await Category.findOne({ name: "Tablets" }))._id;
  const televisionsCategoryId = (
    await Category.findOne({ name: "Televisions" })
  )._id;
  const smartwatchesCategoryId = (
    await Category.findOne({ name: "Smartwatches" })
  )._id;
  const headphonesCategoryId = (await Category.findOne({ name: "Headphones" }))
    ._id;
  const gamingConsolesCategoryId = (
    await Category.findOne({
      name: "Gaming Consoles",
    })
  )._id;
  const monitorsCategoryId = (await Category.findOne({ name: "Monitors" }))._id;
  const printersCategoryId = (await Category.findOne({ name: "Printers" }))._id;
  const dronesCategoryId = (await Category.findOne({ name: "Drones" }))._id;
  const products = [
    // Smartphones
    {
      name: "iPhone 14 Pro",
      price: 4495,
      shortDescription:
        "Apple's latest flagship smartphone with advanced camera technology.",
      availableQuantity: 20,
      image:
        "https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2022/9/pr_2022_9_9_9_36_15_911_03.jpg",
      reviews: [],
      category: smartphonesCategoryId,
      specifications: [
        { key: "Screen Size", value: "6.1 inches" },
        { key: "Storage", value: "128GB" },
        { key: "Camera", value: "48MP triple-lens" },
      ],
    },
    {
      name: "Samsung Galaxy S23 Ultra",
      price: 5395,
      shortDescription:
        "High-end smartphone with 200MP quad-lens camera and S Pen support.",
      availableQuantity: 15,
      image:
        "https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2023/3/pr_2023_3_15_9_51_47_290_00.jpg",
      reviews: [],
      category: smartphonesCategoryId,
      specifications: [
        { key: "Screen Size", value: "6.8 inches" },
        { key: "Storage", value: "256GB" },
        { key: "Battery", value: "5000mAh" },
      ],
    },
    {
      name: "Google Pixel 8 Pro",
      price: 4045,
      shortDescription:
        "Flagship phone with Google's latest AI-powered camera features.",
      availableQuantity: 10,
      image:
        "https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2023/10/pr_2023_10_30_7_39_25_343_04.jpg",
      reviews: [],
      category: smartphonesCategoryId,
      specifications: [
        { key: "Screen Size", value: "6.7 inches" },
        { key: "Storage", value: "128GB" },
        { key: "Processor", value: "Google Tensor G3" },
      ],
    },
    {
      name: "OnePlus 11",
      price: 3145,
      shortDescription:
        "Powerful performance and stunning design with Hasselblad camera.",
      availableQuantity: 25,
      image:
        "https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2023/1/pr_2023_1_30_8_29_4_958_00.jpg",
      reviews: [],
      category: smartphonesCategoryId,
      specifications: [
        { key: "Screen Size", value: "6.7 inches" },
        { key: "Storage", value: "256GB" },
        { key: "RAM", value: "12GB" },
      ],
    },

    // Laptops
    {
      name: "MacBook Pro 14-inch",
      price: 8995,
      shortDescription: "High-performance laptop with Apple's M2 Pro chip.",
      availableQuantity: 8,
      image:
        "https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2023/10/pr_2023_10_31_8_48_32_748_00.jpg",
      reviews: [],
      category: laptopsCategoryId,
      specifications: [
        { key: "Screen Size", value: "14 inches" },
        { key: "Processor", value: "M2 Pro" },
        { key: "RAM", value: "16GB" },
      ],
    },
    {
      name: "Dell XPS 13",
      price: 5395,
      shortDescription:
        "Compact and powerful ultrabook with InfinityEdge display.",
      availableQuantity: 12,
      image:
        "https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2024/3/pr_2024_3_6_9_9_26_881_01.jpg",
      reviews: [],
      category: laptopsCategoryId,
      specifications: [
        { key: "Screen Size", value: "13.4 inches" },
        { key: "Processor", value: "Intel Core i7" },
        { key: "Storage", value: "512GB SSD" },
      ],
    },
    {
      name: "HP Spectre x360",
      price: 6295,
      shortDescription: "Versatile 2-in-1 laptop with a 4K OLED display.",
      availableQuantity: 10,
      image:
        "https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2024/8/pr_2024_8_19_9_39_52_302_00.jpg",
      reviews: [],
      category: laptopsCategoryId,
      specifications: [
        { key: "Screen Size", value: "13.5 inches" },
        { key: "Processor", value: "Intel Core i7" },
        { key: "Battery Life", value: "12 hours" },
      ],
    },
    {
      name: "Lenovo ThinkPad X1 Carbon",
      price: 7195,
      shortDescription:
        "Lightweight and durable laptop designed for business professionals.",
      availableQuantity: 7,
      image:
        "https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2024/4/pr_2024_4_23_7_20_10_479_00.jpg",
      reviews: [],
      category: laptopsCategoryId,
      specifications: [
        { key: "Screen Size", value: "14 inches" },
        { key: "Processor", value: "Intel Core i7" },
        { key: "Weight", value: "2.49 lbs" },
      ],
    },

    // Tablets
    {
      name: "iPad Pro 12.9-inch",
      price: 4945,
      shortDescription:
        "Powerful tablet with M2 chip and Liquid Retina XDR display.",
      availableQuantity: 10,
      image:
        "https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2024/5/pr_2024_5_7_18_13_9_979_00.jpg",
      reviews: [],
      category: tabletsCategoryId,
      specifications: [
        { key: "Screen Size", value: "12.9 inches" },
        { key: "Storage", value: "128GB" },
        { key: "Processor", value: "M2" },
      ],
    },
    {
      name: "Samsung Galaxy Tab S9",
      price: 4045,
      shortDescription: "High-resolution AMOLED tablet with S Pen included.",
      availableQuantity: 15,
      image:
        "https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2023/8/pr_2023_8_8_8_40_54_845_00.jpg",
      reviews: [],
      category: tabletsCategoryId,
      specifications: [
        { key: "Screen Size", value: "11 inches" },
        { key: "Battery", value: "8000mAh" },
        { key: "RAM", value: "8GB" },
      ],
    },
    {
      name: "Microsoft Surface Pro 9",
      price: 4495,
      shortDescription: "Versatile 2-in-1 device with a detachable keyboard.",
      availableQuantity: 8,
      image:
        "https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2023/12/pr_2023_12_18_11_17_36_928_00.jpg",
      reviews: [],
      category: tabletsCategoryId,
      specifications: [
        { key: "Screen Size", value: "13 inches" },
        { key: "Storage", value: "256GB SSD" },
        { key: "RAM", value: "8GB" },
      ],
    },
    {
      name: "Huawei MatePad 11",
      price: 1945,
      shortDescription:
        "High-performance tablet with HarmonyOS and a 120Hz display.",
      availableQuantity: 18,
      image:
        "https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/8/pr_2021_8_3_12_31_26_654_10.jpg",
      reviews: [],
      category: tabletsCategoryId,
      specifications: [
        { key: "Screen Size", value: "11 inches" },
        { key: "Storage", value: "128GB" },
        { key: "Battery Life", value: "12 hours" },
      ],
    },

    // Televisions
    {
      name: "Samsung QN90B QLED",
      price: 6745,
      shortDescription:
        "Smart TV with vibrant Quantum Dot technology and HDR support.",
      availableQuantity: 5,
      image:
        "https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2024/9/pr_2024_9_23_14_55_42_924_00.jpg",
      reviews: [],
      category: televisionsCategoryId,
      specifications: [
        { key: "Screen Size", value: "65 inches" },
        { key: "Resolution", value: "4K" },
        { key: "Smart TV", value: "Yes" },
      ],
    },
    {
      name: "LG C3 OLED",
      price: 8095,
      shortDescription: "4K OLED TV with perfect blacks and cinematic color.",
      availableQuantity: 7,
      image:
        "https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2023/5/pr_2023_5_15_10_32_53_396_00.jpg",
      reviews: [],
      category: televisionsCategoryId,
      specifications: [
        { key: "Screen Size", value: "55 inches" },
        { key: "Resolution", value: "4K" },
        { key: "HDR", value: "Dolby Vision" },
      ],
    },
    {
      name: "Sony Bravia XR A95K",
      price: 8995,
      shortDescription:
        "Premium OLED TV with Acoustic Surface Audio+ technology.",
      availableQuantity: 4,
      image:
        "https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2023/8/pr_2023_8_23_14_3_14_990_00.jpg",
      reviews: [],
      category: televisionsCategoryId,
      specifications: [
        { key: "Screen Size", value: "65 inches" },
        { key: "Resolution", value: "4K" },
        { key: "Processor", value: "Cognitive Processor XR" },
      ],
    },
    {
      name: "TCL 6-Series Roku TV",
      price: 2925,
      shortDescription:
        "Affordable 4K TV with Mini-LED backlight and easy Roku interface.",
      availableQuantity: 10,
      image:
        "https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2024/2/pr_2024_2_26_10_59_10_46_00.jpg",
      reviews: [],
      category: televisionsCategoryId,
      specifications: [
        { key: "Screen Size", value: "55 inches" },
        { key: "Resolution", value: "4K" },
        { key: "Smart TV", value: "Roku TV" },
      ],
    },

    // Smartwatches
    {
      name: "Apple Watch Series 9",
      price: 1795,
      shortDescription:
        "Advanced health monitoring features and customizable watch faces.",
      availableQuantity: 20,
      image:
        "https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2023/9/pr_2023_9_13_1_50_24_836_00.jpg",
      reviews: [],
      category: smartwatchesCategoryId,
      specifications: [
        { key: "Display", value: "Always-On Retina" },
        { key: "Battery Life", value: "18 hours" },
        { key: "Connectivity", value: "GPS + Cellular" },
      ],
    },
    {
      name: "Samsung Galaxy Watch 6",
      price: 1485,
      shortDescription:
        "Sleek design with fitness tracking and Wear OS integration.",
      availableQuantity: 15,
      image:
        "https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2023/7/pr_2023_7_20_14_10_28_810_03.jpg",
      reviews: [],
      category: smartwatchesCategoryId,
      specifications: [
        { key: "Display", value: "Super AMOLED" },
        { key: "Battery Life", value: "40 hours" },
        { key: "Connectivity", value: "Bluetooth, LTE" },
      ],
    },
    {
      name: "Garmin Forerunner 965",
      price: 2695,
      shortDescription:
        "Premium GPS smartwatch for athletes with advanced metrics.",
      availableQuantity: 8,
      image:
        "https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2022/1/pr_2022_1_18_14_49_10_63_00.jpg",
      reviews: [],
      category: smartwatchesCategoryId,
      specifications: [
        { key: "Display", value: "AMOLED" },
        { key: "Battery Life", value: "15 days" },
        { key: "GPS", value: "Multi-band" },
      ],
    },
    {
      name: "Fitbit Versa 4",
      price: 895,
      shortDescription:
        "Fitness-focused smartwatch with heart rate monitoring and GPS.",
      availableQuantity: 18,
      image:
        "https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2022/8/pr_2022_8_26_13_44_36_469_02.jpg",
      reviews: [],
      category: smartwatchesCategoryId,
      specifications: [
        { key: "Display", value: "Color LCD" },
        { key: "Battery Life", value: "6 days" },
        { key: "Health Features", value: "Sleep tracking" },
      ],
    },

    // Headphones
    {
      name: "Sony WH-1000XM5",
      price: 1795,
      shortDescription:
        "Premium noise-cancelling headphones with superior sound quality.",
      availableQuantity: 30,
      image:
        "https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2023/4/pr_2023_4_3_7_41_46_930_03.jpg",
      reviews: [],
      category: headphonesCategoryId,
      specifications: [
        { key: "Type", value: "Over-ear" },
        { key: "Noise Cancelling", value: "Yes" },
        { key: "Battery Life", value: "30 hours" },
      ],
    },
    {
      name: "Bose QuietComfort 45",
      price: 1485,
      shortDescription:
        "Comfortable headphones with world-class noise cancellation.",
      availableQuantity: 25,
      image:
        "https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/11/pr_2021_11_12_9_41_4_261_03.jpg",
      reviews: [],
      category: headphonesCategoryId,
      specifications: [
        { key: "Type", value: "Over-ear" },
        { key: "Noise Cancelling", value: "Yes" },
        { key: "Battery Life", value: "24 hours" },
      ],
    },
    {
      name: "Apple AirPods Pro 2",
      price: 1125,
      shortDescription:
        "In-ear noise-cancelling earbuds with adaptive transparency mode.",
      availableQuantity: 40,
      image:
        "https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2024/9/pr_2024_9_9_23_20_42_628_01.jpg",
      reviews: [],
      category: headphonesCategoryId,
      specifications: [
        { key: "Type", value: "In-ear" },
        { key: "Noise Cancelling", value: "Yes" },
        { key: "Battery Life", value: "6 hours (buds)" },
      ],
    },
    {
      name: "JBL Live 660NC",
      price: 895,
      shortDescription:
        "Wireless over-ear headphones with adaptive noise cancellation.",
      availableQuantity: 35,
      image:
        "https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/12/pr_2021_12_10_9_54_15_81_00.jpg",
      reviews: [],
      category: headphonesCategoryId,
      specifications: [
        { key: "Type", value: "Over-ear" },
        { key: "Noise Cancelling", value: "Yes" },
        { key: "Battery Life", value: "40 hours" },
      ],
    },

    // Gaming Consoles
    {
      name: "PlayStation 5",
      price: 2245,
      shortDescription:
        "Next-gen gaming console with 4K resolution and fast SSD.",
      availableQuantity: 15,
      image:
        "https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2020/7/pr_2020_7_10_12_46_35_17_00.jpg",
      reviews: [],
      category: gamingConsolesCategoryId,
      specifications: [
        { key: "Resolution", value: "4K" },
        { key: "Storage", value: "825GB SSD" },
        { key: "Controller", value: "DualSense" },
      ],
    },
    {
      name: "Xbox Series X",
      price: 2245,
      shortDescription:
        "Powerful gaming console with 4K gaming and backward compatibility.",
      availableQuantity: 20,
      image:
        "https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2020/7/pr_2020_7_10_12_7_39_728_00.jpg",
      reviews: [],
      category: gamingConsolesCategoryId,
      specifications: [
        { key: "Resolution", value: "4K" },
        { key: "Storage", value: "1TB SSD" },
        { key: "Performance", value: "12 teraflops" },
      ],
    },
    {
      name: "Nintendo Switch OLED",
      price: 1570,
      shortDescription: "Portable gaming console with a vibrant OLED screen.",
      availableQuantity: 25,
      image:
        "https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/7/pr_2021_7_8_14_45_1_27_00.jpg",
      reviews: [],
      category: gamingConsolesCategoryId,
      specifications: [
        { key: "Screen Size", value: "7 inches" },
        { key: "Storage", value: "64GB" },
        { key: "Modes", value: "Handheld, TV, Tabletop" },
      ],
    },
    {
      name: "Nintendo Switch Lite",
      price: 845,
      shortDescription:
        "Handheld-only version of the popular Nintendo Switch console.",
      availableQuantity: 30,
      image:
        "https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2019/7/pr_2019_7_11_14_29_29_313_00.jpg",
      reviews: [],
      category: gamingConsolesCategoryId,
      specifications: [
        { key: "Screen Size", value: "5.5 inches" },
        { key: "Storage", value: "32GB" },
        { key: "Battery Life", value: "Up to 7 hours" },
      ],
    },

    // Monitors
    {
      name: "LG UltraGear 27GN950",
      price: 3595,
      shortDescription:
        "4K gaming monitor with 144Hz refresh rate and G-SYNC compatibility.",
      availableQuantity: 12,
      image:
        "https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2022/12/pr_2022_12_7_13_40_38_212_00.jpg",
      reviews: [],
      category: monitorsCategoryId,
      specifications: [
        { key: "Screen Size", value: "27 inches" },
        { key: "Resolution", value: "4K" },
        { key: "Refresh Rate", value: "144Hz" },
      ],
    },
    {
      name: "Dell UltraSharp U2723QE",
      price: 3055,
      shortDescription:
        "27-inch 4K monitor with IPS Black technology for professionals.",
      availableQuantity: 18,
      image:
        "https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2022/12/pr_2022_12_8_13_55_22_575_00.jpg",
      reviews: [],
      category: monitorsCategoryId,
      specifications: [
        { key: "Screen Size", value: "27 inches" },
        { key: "Resolution", value: "4K" },
        { key: "Color Support", value: "100% sRGB" },
      ],
    },
    {
      name: "Samsung Odyssey G9",
      price: 6745,
      shortDescription:
        "49-inch curved ultra-wide monitor with a 240Hz refresh rate.",
      availableQuantity: 5,
      image:
        "https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2024/4/pr_2024_4_26_7_18_8_749_00.jpg",
      reviews: [],
      category: monitorsCategoryId,
      specifications: [
        { key: "Screen Size", value: "49 inches" },
        { key: "Resolution", value: "5120 x 1440" },
        { key: "Refresh Rate", value: "240Hz" },
      ],
    },
    {
      name: "ASUS ProArt PA278CV",
      price: 1935,
      shortDescription:
        "27-inch professional monitor with accurate color reproduction.",
      availableQuantity: 20,
      image:
        "https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2022/11/pr_2022_11_28_11_24_11_438_00.jpg",
      reviews: [],
      category: monitorsCategoryId,
      specifications: [
        { key: "Screen Size", value: "27 inches" },
        { key: "Resolution", value: "1440p" },
        { key: "Color Accuracy", value: "100% sRGB" },
      ],
    },

    // Printers
    {
      name: "HP OfficeJet Pro 9015e",
      price: 1030,
      shortDescription:
        "All-in-one wireless printer with fast color printing and scanning.",
      availableQuantity: 15,
      image:
        "https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/5/pr_2021_5_27_13_42_54_115_00.jpg",
      reviews: [],
      category: printersCategoryId,
      specifications: [
        { key: "Type", value: "All-in-One" },
        { key: "Connectivity", value: "Wi-Fi, Ethernet" },
        { key: "Print Speed", value: "22 ppm (black)" },
      ],
    },
    {
      name: "Canon PIXMA TR8620",
      price: 805,
      shortDescription:
        "Compact wireless all-in-one printer for home and office use.",
      availableQuantity: 20,
      image:
        "https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/5/pr_2021_5_31_9_22_47_250_00.jpg",
      reviews: [],
      category: printersCategoryId,
      specifications: [
        { key: "Type", value: "All-in-One" },
        { key: "Connectivity", value: "Wi-Fi, Bluetooth" },
        { key: "Print Speed", value: "15 ppm (black)" },
      ],
    },
    {
      name: "Epson EcoTank ET-3760",
      price: 1795,
      shortDescription:
        "Cartridge-free printer with easy-to-fill ink tanks for high-volume printing.",
      availableQuantity: 10,
      image:
        "https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2024/2/pr_2024_2_2_15_22_52_640_00.jpg",
      reviews: [],
      category: printersCategoryId,
      specifications: [
        { key: "Type", value: "All-in-One" },
        { key: "Connectivity", value: "Wi-Fi, Ethernet" },
        { key: "Ink Type", value: "EcoTank" },
      ],
    },
    {
      name: "Brother HL-L2350DW",
      price: 715,
      shortDescription:
        "Compact monochrome laser printer with duplex printing.",
      availableQuantity: 25,
      image:
        "https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2018/1/pr_2018_1_22_12_37_42_216_00.jpg",
      reviews: [],
      category: printersCategoryId,
      specifications: [
        { key: "Type", value: "Laser" },
        { key: "Connectivity", value: "Wi-Fi" },
        { key: "Print Speed", value: "32 ppm (black)" },
      ],
    },

    // Drones
    {
      name: "DJI Mini 3 Pro",
      price: 3415,
      shortDescription:
        "Lightweight and powerful drone with 4K video and advanced features.",
      availableQuantity: 10,
      image:
        "https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2022/5/pr_2022_5_11_8_57_18_628_00.jpg",
      reviews: [],
      category: dronesCategoryId,
      specifications: [
        { key: "Camera", value: "4K/60fps" },
        { key: "Flight Time", value: "34 minutes" },
        { key: "Weight", value: "249g" },
      ],
    },
    {
      name: "Autel Robotics EVO Lite+",
      price: 5395,
      shortDescription:
        "Versatile drone with excellent low-light camera performance.",
      availableQuantity: 8,
      image:
        "https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2022/3/pr_2022_3_17_17_38_9_992_00.jpg",
      reviews: [],
      category: dronesCategoryId,
      specifications: [
        { key: "Camera", value: "6K/30fps" },
        { key: "Flight Time", value: "40 minutes" },
        { key: "Obstacle Avoidance", value: "Yes" },
      ],
    },
    {
      name: "Parrot Anafi",
      price: 3145,
      shortDescription:
        "Compact drone with 4K HDR camera and 180° tilt gimbal.",
      availableQuantity: 12,
      image:
        "https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2018/6/pr_2018_6_7_10_44_34_500_01.png",
      reviews: [],
      category: dronesCategoryId,
      specifications: [
        { key: "Camera", value: "4K HDR" },
        { key: "Flight Time", value: "25 minutes" },
        { key: "Weight", value: "320g" },
      ],
    },
    {
      name: "Ryze Tello",
      price: 445,
      shortDescription:
        "Affordable beginner drone with HD camera and easy controls.",
      availableQuantity: 30,
      image:
        "https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2018/4/pr_2018_4_10_14_37_12_358_00.jpg",
      reviews: [],
      category: dronesCategoryId,
      specifications: [
        { key: "Camera", value: "720p HD" },
        { key: "Flight Time", value: "13 minutes" },
        { key: "Weight", value: "80g" },
      ],
    },
  ];

  for (const product of products) {
    try {
      const newProduct = new Product(product);
      await newProduct.save();
    } catch (error) {
      console.error("Błąd podczas zapisywania kategorii: ", error);
    }
  }
};

module.exports = populateProducts;
