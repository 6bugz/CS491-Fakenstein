import React from "react";
import {Image, Modal, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import { dHeight, dWidth} from "../constants/utils";
import {Text} from "./Themed";

export default class EditWeb extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            age: false,
            gender: false,
            skinColor: false,
            box: null,
            suggestions: null,
        }

    }

    show = (box, suggestions) => {
        console.log(box)
        this.setState({
            show: true,
            age: box.age,
            gender: box.gender,
            skinColor: box.skinColor,
            box: box,
            suggestions: suggestions,
        });
    }

    close = () => {
        this.setState({show: false});
    }

    blend = () => {
        this.setState({show: false});
        // send to server: blend only?
        const b = {
            age: this.state.age,
            gender: this.state.gender,
            skinColor: this.state.skinColor,
            height: this.state.box.height,
            left: this.state.box.left,
            top: this.state.box.top,
            width: this.state.box.width,
        }
        this.props.update(b, "blend");
    }

    blur = () => {
        this.setState({show: false});
        // send to server: blur only?
        const b = {
            age: this.state.age,
            gender: this.state.gender,
            skinColor: this.state.skinColor,
            height: this.state.box.height,
            left: this.state.box.left,
            top: this.state.box.top,
            width: this.state.box.width,
        }
        this.props.update(b, "blur");
    }

    setAge = () => {
        this.setState({age: !this.state.age});
    }

    setGender = () => {
        this.setState({gender: !this.state.gender});
    }

    setSkinColor = () => {
        this.setState({skinColor: !this.state.skinColor});
    }

    renderOutsideTouchable(onTouch) {
        const view = <View style={{flex: 1, width: "100%"}}/>
        if(!onTouch) return view;

        return (
            <TouchableWithoutFeedback onPress={onTouch} style={{flex: 1, width: "100%"}}>
                {view}
            </TouchableWithoutFeedback>
        )
    }

    selectFace(index) {
        this.props.blendFace(this.state.suggestions[index], this.state.box);
    }

    render() {
        // this.props.blendFace
        const {show, age, gender, skinColor, suggestions} = this.state;
        const {onTouchOutside} = this.props;

        return (
            <Modal animationType={"fade"} transparent={true}
                   visible={show}
                   onRequestClose={this.close}>
                <View style={styles.container}>
                    {this.renderOutsideTouchable(onTouchOutside)}
                    <View style={styles.popup}>
                        <View style={{marginBottom: 30}}>
                            <Text style={styles.title}>Edit Face Information</Text>
                            <View style={styles.rowView}>
                                <Text style={styles.text}>Age Group:</Text>
                                <TouchableOpacity style={styles.info} onPress={this.setAge}>
                                    <Text style={styles.touchText}>{age ? "Young" : "Old"} </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.separator}/>
                            <View style={styles.rowView}>
                                <Text style={styles.text}>Gender Group:</Text>
                                <TouchableOpacity style={styles.info} onPress={this.setGender}>
                                    <Text style={styles.touchText}>{gender ? "Male" : "Female"} </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.separator}/>
                            <View style={styles.rowView}>
                                <Text style={styles.text}>Skin Color Group:</Text>
                                <TouchableOpacity style={styles.info} onPress={this.setSkinColor}>
                                    <Text style={styles.touchText}>{skinColor ? "Dark" : "Pale"} </Text>
                                </TouchableOpacity>
                            </View>

                            <Text style={styles.title}>Suggested Generated Faces</Text>
                            <View style={styles.rowView}>
                                <TouchableOpacity style={styles.faceImage} onPress={() => this.selectFace(0)}>
                                    <Image source={suggestions[0]}/>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.faceImage} onPress={() => this.selectFace(1)}>
                                    <Image source={suggestions[1]}/>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.faceImage} onPress={() => this.selectFace(2)}>
                                    <Image source={suggestions[2]}/>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.rowView}>
                                <TouchableOpacity style={styles.button} onPress={this.blur}>
                                    <Text style={styles.buttonText}>BLUR</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={this.blend}>
                                    <Text style={styles.buttonText}>APPLY CHANGES</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: "#000000AA",
    },
    popup: {
        backgroundColor: "white",
        width: "100%",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingHorizontal: 10,
        maxHeight: dHeight * 0.5,
    },
    title: {
        color: '#182E44',
        fontSize: 20,
        fontWeight: "500",
        margin: 15,
    },
    text: {
        color: '#182E44',
        fontSize: 18,
        fontWeight: "400",
        margin: 10,
    },
    separator: {
        opacity: 0.2,
        backgroundColor: '#182E44',
        height: 1,
    },
    info : {
        width: dWidth * 0.5,
        alignItems:'center',
        margin: 10,
    },
    touchText: {
        color:'#F92660',
        fontSize: 18,
        fontWeight: "600",
    },
    rowView: {
        alignItems: "stretch",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    button: {
        width: "45%",
        backgroundColor:'#F92660',
        borderRadius: 20,
        alignItems: "center",
        marginHorizontal: 10,
        marginTop: 15,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        margin: 10,
    },
    faceImage: {
        margin: 10,
        width: 40,
        height: 40,
    },
});