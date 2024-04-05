import { createContext, useState, useContext } from 'react';

export const BackgroundImgContext = createContext();

export const useBackgroundImgContext = () => {
    return useContext(BackgroundImgContext);
}

const backgroundUrlPicker = () => {
    const imgArray = [
    "https://aperture-bucket-april-2023.s3.amazonaws.com/header1.jpeg",
    "https://aperture-bucket-april-2023.s3.amazonaws.com/header2.jpeg",
    "https://aperture-bucket-april-2023.s3.amazonaws.com/header5.jpeg"
    ];
    const index = Math.floor(Math.random() * imgArray.length);
    return imgArray[index];

}
export default function BackgroundImgProvider(props) {
    const [backgroundImg, setBackgroundImg] = useState(backgroundUrlPicker());

    return (
        <BackgroundImgContext.Provider
          value={{
            backgroundImg,
            setBackgroundImg
          }}
        >
          {props.children}
        </BackgroundImgContext.Provider>
    )
}
