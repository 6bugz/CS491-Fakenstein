import React, {useEffect, useState} from 'react';
import {Image, Route, StyleSheet} from 'react-native';
import {Colors} from '../constants/Colors';
import {View} from '../components/Themed';
import {backendURL, dWidth, ImageType, isWeb, maximizeBox, Navigation} from "../constants/utils";
import BottomToolBox from "../components/BottomToolBox";
import {BoundaryBox} from "../constants/Face";
import PopupBox from "../components/PopupBox";
import EditPopup from "../components/EditPopup";
import LoadingScreen from "./LoadingScreen";
import EditWeb from "../components/EditWeb";

type Props = {
    route: Route;
    navigation: Navigation;
}

export default function ModifyScreen({route, navigation}: Props) {
    const [image, setImage] = useState<ImageType>(route.params.image);
    const [boxes, setBoxes] = useState<BoundaryBox[]>(route.params.boxes);
    const [index, setIndex] = useState(0);

    const [imageStack, setImageStack] = useState<ImageType[]>([image]);
    const [boxStack, setBoxStack] = useState<BoundaryBox[][]>([boxes]);

    const [loading, setLoading] = useState(false);

    let popupRef = React.createRef();
    const imageHeight = Math.round(dWidth / image.width * image.height);


    useEffect(() => {
        console.log("Modify");
        console.log(boxes);
    }, []);

    useEffect(() => {
        navigation.setOptions({ headerShown: !loading })
    }, [loading]);

    const handlePushToExport = () => {
        navigation.push('Export', {
            image: image
        });
    }

    const showPopup = async (ind) => {
        setIndex(ind);
        console.log("MODIFY SHOW");
        if (isWeb) {
            //setLoading(true);
            const data = {"faces": JSON.stringify(boxes[ind])};

            await fetch(backendURL + '/suggested_faces', {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data),
            }).then((response) => response.json())
                .then((responseJson) => {
                    let suggestions = [];
                    suggestions.push("data:image/jpeg;base64," + responseJson["face1"]);
                    suggestions.push("data:image/jpeg;base64," + responseJson["face2"]);
                    suggestions.push("data:image/png;base64," + responseJson["face3"]);
                    setLoading(false);
                    popupRef.show(boxes[ind], suggestions);

                }).catch((error) => console.log(error.message));
            setLoading(false);
        } else {
            popupRef.show(boxes[ind]);
        }
    }

    const undo = () => {
        console.log("UNDO ");
        if (boxStack.length > 1) {
            imageStack.pop();
            setImage(imageStack[imageStack.length - 1]);
            boxStack.pop();
            setBoxes(boxStack[boxStack.length - 1]);
        }
    }

    const pushToStack = (responseJson, box) => {
        const blendedImage = JSON.parse(JSON.stringify(image));
        blendedImage.uri = "data:image/png;base64," + responseJson["image"];
        setImage(blendedImage);
        setImageStack([...imageStack, blendedImage]);
        const newBoxes = JSON.parse(JSON.stringify(boxes));
        newBoxes[index] = box;
        setBoxStack([...boxStack, newBoxes]);
        setBoxes(newBoxes);
    }

    const closePopup = () => {
        popupRef.close();
    }

    const update = async (box: BoundaryBox, route: string) => {
        console.log(route + " request.");
        if (route !== 'blur')
            setLoading(true);

        if (!isWeb) {
            const data = new FormData();
            // @ts-ignore
            data.append("image", image.uri.split(',')[1]);
            data.append("faces", JSON.stringify(maximizeBox(imageHeight, image, box)));

            await fetch(backendURL + '/' + route, {
                method: 'POST',
                headers: {"Content-Type": "multipart/form-data"},
                body: data,
            }).then((response) => response.json())
                .then((responseJson) => {
                    pushToStack(responseJson, box);
                }).catch((error) => console.log(error.message));
        }
        else {
            const data = {"image": image.uri.slice(22), "faces": JSON.stringify(box)};

            await fetch(backendURL + '/' + route, {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data),
            }).then((response) => response.json())
                .then((responseJson) => {
                    pushToStack(responseJson, box);
                }).catch((error) => console.log(error.message));
        }
        setLoading(false);
    }

    const blend = async (imageB64, box) => {
        popupRef.close();
        setLoading(true);

        const data = {"src_image": image.uri.slice(22), "selected_image": imageB64.slice(22), "faces": JSON.stringify(box)};

        await fetch(backendURL + '/selected_swap', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data),
        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson["message"] === "successful") {
                    const blendedImage = JSON.parse(JSON.stringify(image));
                    blendedImage.uri = "data:image/png;base64," + responseJson["image"];
                    setImage(blendedImage);
                    setImageStack([...imageStack, blendedImage]);
                    const newBoxes = JSON.parse(JSON.stringify(boxes));
                    setBoxStack([...boxStack, newBoxes]);
                    setBoxes(newBoxes);
                }
            }).catch((error) => console.log(error.message));
        setLoading(false);
    }


    return loading ? <LoadingScreen/> : (
        !!image && (
            <View style={styles.container}>
                <Image source={{uri: image.uri}} style={
                    isWeb ? [styles.webImage, {width: image.width, height: image.height}]
                    : styles.image}/>
                <View style={isWeb ? {position: 'absolute', backgroundColor: 'transparent',
                        width: image.width, height: image.height}
                    : [styles.boxContainer, {height: imageHeight}]}>
                    {(boxes.length > 0) && boxes.map((face, index) => (
                        <PopupBox key={index} inx={index} face={face} open={showPopup}/>
                    ))}
                </View>
                <BottomToolBox undoF={undo} undoT={"Undo"} nextF={handlePushToExport} nextT={"Done"}/>
                {(!isWeb) &&
                    <EditPopup ref={(target) => popupRef = target}
                               onTouchOutside={closePopup} update={update}/>}
                {(isWeb) &&
                    <EditWeb ref={(target) => popupRef = target}
                             onTouchOutside={closePopup} update={update} blendFace={blend}/>}
            </View>
        )
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.dark.background,
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
        width: dWidth,
    },
    text: {
        color: Colors.dark.text,
        fontSize: 20,
        fontWeight: '600',
    },
});
