import React from 'react';
import {Box, Button} from "@chakra-ui/react";
import Select from 'react-select';
import { useState } from 'react';

const cropMapping =
    ([
    { value: 3079,label: 'Brussels Sprouts'},
    { value: 3089,label: 'Melon, Watermelon'},
    { value: 3091,label: 'Melon, Honeydew'},
    { value: 3095,label: 'Melon, Watermelon Red Seedless'},
    { value: 3099,label: 'Beets w/greens'},
    { value: 3105,label: 'Cabbage, Green, Organic'},
    { value: 3107,label: 'Carrots, Foodservice/Jumbo, Organic'},
    { value: 3132,label: 'Carrots, Rainbow'},
    { value: 3132,label: 'Carrots, Rainbow Bulk'},
    { value: 3134,label: 'Sweet Corn, Organic'},
    { value: 3135,label: 'Sweet Corn'},
    { value: 3138,label: 'Greens, Collards'},
    { value: 3140,label: 'Kohlrabi, White'},
    { value: 3141,label: 'Onions, Red, Organic'},
    { value: 3153,label: 'Peppers, Jalapeño'},
    { value: 3166,label: 'Potatoes, Red'},
    { value: 3171,label: 'Potatoes, Yellow'},
    { value: 3178,label: 'Radishes, Daikon'},
    { value: 3180,label: 'Radish, Watermelon'},
    { value: 3184,label: 'Squash, Summer, Zucchini'},
    { value: 3188,label: 'Squash, Winter, Butternut'},
    { value: 3189,label: 'Squash, Winter, Delicata'},
    { value: 3190,label: 'Squash, Winter, Spaghetti'},
    { value: 3200,label: 'Tomatoes, Grape'},
    { value: 3201,label: 'Tomatoes, Roma'},
    { value: 3202,label: 'Tomatoes, Slicers'},
    { value: 3216,label: 'Rhubarb'},
    { value: 3242,label: 'Greens, Lettuce, Romaine, Green, Organic'},
    { value: 3252,label: 'Radish, French Breakfast'},
    { value: 3266,label: 'Onions, Scallions'},
    { value: 3278,label: 'Radish, Red, Bunched w/Tops'},
    { value: 3300,label: 'Greens, Lettuce, Salad Mix'},
    { value: 3304,label: 'Garlic Scapes'},
    { value: 3316,label: 'Greens, Lettuce, Green Leaf'},
    { value: 3326,label: 'Fennel'},
    { value: 3361,label: 'Cucumbers, Slicing'},
    { value: 3362,label: 'Cucumbers, Pickling'},
    { value: 3364,label: 'Greens, Mustard'},
    { value: 3390,label: 'Potatoes, New Red'},
    { value: 3401,label: 'Beans, Green'},
    { value: 3404,label: 'Tomatillos'},
    { value: 3405,label: 'Okra'},
    { value: 3411,label: 'Greens, Bok Choy, Baby'},
    { value: 3449,label: 'Peppers, Poblano'},
    { value: 3458,label: 'Peppers, Habanero'},
    { value: 3539,label: 'Ground Cherries'},
    { value: 3544,label: 'Squash, Winter, Acorn'},
    { value: 3573,label: 'Bok Choi'},
    { value: 3579,label: 'Celery, Organic'},
    { value: 3592,label: 'Broccoli'},
    { value: 3598,label: 'Greens, Lettuce, Romaine'},
    { value: 3613,label: 'Beets, Red, Organic'},
    { value: 3668,label: 'Eggplant, Japanese'},
    { value: 3669,label: 'Greens, Chard'},
    { value: 3700,label: 'Greens, Spinach, Chinese water spinach'},
    { value: 3702,label: 'Greens, Malabar'},
    { value: 3717,label: 'Eggplant, Globe'},
    { value: 3733,label: 'Melon, Cantaloupe'},
    { value: 3754,label: 'Cabbage'},
    { value: 3755,label: 'Carrots'},
    { value: 3756,label: 'Cucumbers'},
    { value: 3757,label: 'Eggplant'},
    { value: 3759,label: 'Onions'},
    { value: 3768,label: 'Cranberries, organic'},
    { value: 3775,label: 'Kohlrabi'},
    { value: 3806,label: 'Greens, Lettuce, Head'},
    { value: 3807,label: 'Cauliflower'},
    { value: 3809,label: 'Beans, Green, Yellow or Purple'},
    { value: 3813,label: 'Greens, Kale'},
    { value: 3819,label: 'Greens, Salad Mix - 24 ct 0.75lb'},
    { value: 3826,label: 'Greens, Sweet Potato Leaves'},
    { value: 3828,label: 'Peppers, Bell'},
    { value: 3853,label: 'Greens, Eggplant-12 ct '},
    { value: 3854,label: 'Greens, Pumpkin Vine'},
    { value: 9997,label: 'Radishes, Watermelon'},
    { value: 9998,label: 'Greens, Spinach'},
    { value: 9999,label: 'Cilantro'},
]);

const farmMapping = ([
    { value: "None", label: "None"},
    { value: "POG", label: "POG"},
    { value: "STF", label: "STF"},
    { value: "WKH", label: "WKH"},
    { value: "YMF", label: "YMF"},
    { value: "HAF", label: "HAF"},
    { value: "NTN", label: "NTN"},
    { value: "SGC", label: "SGC"},
    { value: "CVP", label: "CVP"},
    { value: "CHO", label: "CHO"},
    { value: "KLF", label: "KLF"},
    { value: "LXF", label: "LXF"},
    { value: "D2D", label: "D2D"},
    { value: "CBS", label: "CBS"},
    { value: "SEE", label: "SEE"},
    { value: "MLF", label: "MLF"},
    { value: "MHG", label: "MHG"},
    { value: "MKV", label: "MKV"},
    { value: "AFC", label: "AFC"},
    { value: "MLG", label: "MLG"},
    { value: "PBY", label: "PBY"},
    { value: "CLP", label: "CLP"},
    { value: "PLT", label: "PLT"},
    { value: "SXF", label: "SXF"},
    { value: "KHF", label: "KHF"},
    { value: "MLP", label: "MLP"},
    { value: "KSL", label: "KSL"},
    { value: "DTF", label: "DTF"},
    { value: "RSV", label: "RSV"},
    { value: "OHF", label: "OHF"},
    { value: "CMA", label: "CMA"},
    { value: "CBO", label: "CBO"},
    { value: "CMU", label: "CMU"},
    { value: "TEB", label: "TEB"},
    { value: "LVO", label: "LVO"},
    { value: "JWI", label: "JWI"},
    { value: "ONC", label: "ONC"},
    { value: "TXI", label: "TXI"},
    { value: "LOF", label: "LOF"},
    { value: "MMO", label: "MMO"},
    { value: "PZM", label: "PZM"},
    { value: "LEE", label: "LEE"},
    { value: "MHA", label: "MHA"},
    { value: "LDX", label: "LDX"},
    { value: "AGF", label: "AGF"},
    { value: "BXF", label: "BXF"},
    { value: "SRF", label: "SRF"},
    { value: "LFF", label: "LFF"},
    { value: "HOP", label: "HOP"},
    { value: "MFP", label: "MFP"},
    { value: "CAL", label: "CAL"},
    { value: "CTH", label: "CTH"},
    { value: "LKW", label: "LKW"},
    { value: "UNK", label: "UNK"},
    { value: "KAL", label: "KAL"},
]);

const Dropdown = () => {
    const [selectedCrops, setSelectedCrops] = useState([]);
    const [selectedFarms, setSelectedFarms] = useState([]);

    const handleSubmit = () => {
        console.log(selectedCrops);
        console.log(selectedFarms);
    };

    return (
    <Box>
        <Select
            defaultValue={[]}
            onChange={setSelectedCrops}
            value={selectedCrops}
            isMulti
            name="crops"
            options={cropMapping}
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder={"Choose your crops"}
        >
        </Select>
        <Select
            defaultValue={[]}
            onChange={setSelectedFarms}
            value={selectedFarms}
            name="farms"
            options={farmMapping}
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder={"Choose your farm"}
        >
        </Select>
        <Button onClick={handleSubmit}>Submit</Button>
    </Box>
    );
};

export default Dropdown;
