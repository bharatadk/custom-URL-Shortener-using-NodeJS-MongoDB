import {
    shortUrlModel
} from "./model.js"

const generator = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = ""
    const characterLength = 6;
    for (let i = 0; i < characterLength; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    console.log("result", result)
    return result;
}

export const generateString = async (long_url, custom_url) => {
    let string_made;
    let new_string;
    let duplicate;
    console.log('lll', long_url, custom_url)
    while (true) {
        if (custom_url == "") {
            new_string = await generator()
            string_made = await shortUrlModel.findOne({
                shortUrl: new_string
            })
            if (string_made == null) {
                await shortUrlModel.create({
                    longUrl: long_url,
                    shortUrl: new_string
                })
                break;
            }
        } else {
            string_made = await shortUrlModel.findOne({
                shortUrl: custom_url
            })
            if (string_made == null) {
                await shortUrlModel.create({
                    longUrl: long_url,
                    shortUrl: custom_url
                })
                break;
            } else {
                console.log("duplicate");
                duplicate = "yes";
                break
            }

        }
    }
    return duplicate;


}