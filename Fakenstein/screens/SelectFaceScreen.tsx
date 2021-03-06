import React, {useEffect, useState} from 'react';
import {Image, Route, StyleSheet} from 'react-native';
import {Colors} from '../constants/Colors';
import {View} from '../components/Themed';
import FaceBox from '../components/FaceBox';
import {BoundaryBox} from "../constants/Face";
import {backendURL, dWidth, ImageType, isWeb, Navigation, resizeBox, resizeBoxes} from "../constants/utils";
import BottomToolBox from "../components/BottomToolBox";
import LoadingScreen from "./LoadingScreen";
import MessagePopup from "../components/MessagePopup";

type Props = {
    route: Route;
    navigation: Navigation;
}

export default function SelectFaceScreen({route, navigation}: Props) {

    const image: ImageType = route.params.image;
    const imageHeight = Math.round(dWidth / image.width * image.height);

    const [boxes, setBoxes] = useState<BoundaryBox[]>([]);
    const [serverBoxes] = useState<BoundaryBox[]>(route.params.boxes);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = React.useState(false);

    useEffect(() => {
        console.log(dWidth + ", " + imageHeight);
        console.log(image.width + ", " + image.height);
        if (isWeb) {
            setBoxes( serverBoxes);
        } else {
            setBoxes(resizeBoxes(imageHeight, image, serverBoxes));
        }
    }, []);

  useEffect(() => {
    navigation.setOptions({ headerShown: !loading })
  }, [loading]);

    const setBackground = (index: number, val: boolean) => {
        boxes[index].isBackground = val;
        serverBoxes[index].isBackground = val;
        console.log(index + " " + val);
    }

    const goToModify = async () => {
        setLoading(true);
        const data = new FormData();
        const faces = serverBoxes.map((face, index) =>
            (face.isBackground ? {[index]: face} : null)
        );
        // @ts-ignore
        data.append("image", {uri: image.uri, name: 'image.jpg', type: 'image/jpeg'});
        data.append("faces", JSON.stringify(faces));
        console.log(data)

        await fetch(backendURL + '/replace', {
            method: 'POST',
            headers: {"Content-Type": "multipart/form-data"},
            body: data,
        }).then((response) => response.json())
            .then((responseJson) => {
                const responseFaces = responseJson["faces"];
                console.log(responseFaces);
                const modifyBoxes: BoundaryBox[] = [];
                let indx = 0;
                console.log(dWidth + ", " + imageHeight);
                console.log(image.width + ", " + image.height);
                for (let box in responseFaces) {
                    if (responseFaces[box]) {
                        let obj = responseFaces[box];
                        if (!obj[indx + ""].invalid) {
                            modifyBoxes.push(resizeBox(imageHeight, image, obj[indx + ""]));
                        }
                    }
                    indx += 1;
                }
                console.log(modifyBoxes);
                const blendedImage = JSON.parse(JSON.stringify(image));
                blendedImage.uri = "data:image/png;base64," + responseJson["image"];
                setLoading(false);
                navigation.push('Modify', {
                    image: blendedImage,
                    boxes: modifyBoxes,
                });
            }).catch((error) => {
                console.log(error.message);
                setVisible(true);
            });
        setLoading(false);
    }

    const goToWebModify = async () => {
        setLoading(true);

        const faces = serverBoxes.map((face, index) =>
            (face.isBackground ? {[index]: face} : null)
        );
        const base64 = image.uri.split(",")[1];
        const data = {"image": base64, "faces": JSON.stringify(faces)};

        await fetch(backendURL + '/replace_web', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data),
        }).then((response) => response.json())
            .then((responseJson) => {
                const responseFaces = responseJson["faces"];
                console.log(responseFaces);
                const modifyBoxes: BoundaryBox[] = [];
                let indx = 0;
                console.log(dWidth + ", " + imageHeight);
                console.log(image.width + ", " + image.height);
                for (let box in responseFaces) {
                    if (responseFaces[box]) {
                        let obj = responseFaces[box];
                        if (!obj[indx + ""].invalid) {
                            modifyBoxes.push(obj[indx + ""]);
                        }
                    }
                    indx += 1;
                }
                console.log(modifyBoxes);
                const blendedImage = JSON.parse(JSON.stringify(image));
                blendedImage.uri = "data:image/png;base64," + responseJson["image"];
                setLoading(false);
                navigation.push('Modify', {
                    image: blendedImage,
                    boxes: modifyBoxes,
                });
            }).catch((error) => {
                console.log(error.message);
                setVisible(true);
            });
        setLoading(false);
    }

    function sleep(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }

    const handleFakeNavigation = async () => {
        setLoading(true);
        await sleep(3000);
        setLoading(false);
        navigation.push('Modify', {
            image: image,
            boxes: boxes,
        });
    }


    return loading ? <LoadingScreen/> : (!!image && (
            <View style={styles.container}>
                <View style={[styles.container, styles.imageContainer]}>
                    <Image source={{uri: image.uri}} style={isWeb ? [styles.webImage, {width: image.width, height: image.height}]
                        : styles.image}/>
                    <View style={[styles.boxContainer, isWeb ? {width: image.width, height: image.height}
                        : {width: dWidth, height: imageHeight}]}>
                        {(boxes.length > 0) && boxes.map((face, index) => (
                            <FaceBox key={index} inx={index} face={face} handler={setBackground}/>
                        ))}
                    </View>
                </View>
                <MessagePopup visible={visible} setVisible={setVisible}
                              success={false}
                              message={"We are having problems identifying a person in the selected boxes. " +
                                  "Please remove boxes that do not contain a human face."}/>
                <BottomToolBox undoF={null} undoT={""} nextF={isWeb ? goToWebModify : goToModify}
                               nextT={"Replace"}/>
            </View>)
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.dark.background,
    },
    imageContainer: {
        marginBottom: 50,
    },
    image: {
        flex: 1,
        width: dWidth,
        height: undefined,
        resizeMode: 'contain',
    },
    webImage: {
        flex: 1,
        resizeMode: 'contain',
    },
    boxContainer: {
        position: 'absolute',
        backgroundColor: 'transparent',
    },
});
