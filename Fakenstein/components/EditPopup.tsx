import React from "react";
import {Modal, Platform, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import {dHeight, dWidth} from "../constants/utils";
import {Text} from "./Themed";

export default class EditPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      box: null,
    }
  }

  show = (box) => {
    console.log(box)
    this.setState({
      show: true,
      box: box,
    });
  }

  close = () => {
    this.setState({show: false});
  }

  blend = () => {
    this.setState({show: false});
    this.props.update(this.state.box, "blend");
  }

  blur = () => {
    this.setState({show: false});
    this.props.update(this.state.box, "blur");
  }

  lucky = () => {
    this.setState({show: false});
    this.props.update(this.state.box, "i_feel_lucky");
  }

  setAge = () => {
    this.setState({box: {...this.state.box, age: !this.state.box.age}})
  }

  setGender = () => {
    this.setState({box: {...this.state.box, gender: !this.state.box.gender}});
  }

  setSkinColor = () => {
    this.setState({box: {...this.state.box, skinColor: !this.state.box.skinColor}});
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

  render() {
    const {show, box} = this.state;
    const {onTouchOutside} = this.props;

    return (
      <Modal animationType={"fade"} transparent={true}
             visible={show}
             onRequestClose={this.close}>
        {(!!box) && <View style={styles.container}>
          {this.renderOutsideTouchable(onTouchOutside)}
          <View style={styles.popup}>
            <View style={{marginBottom: 30}}>
              <Text style={styles.title}>Edit Face Information</Text>
              <View style={styles.rowView}>
                <Text style={styles.text}>Age Group:</Text>
                <TouchableOpacity style={styles.info} onPress={this.setAge}>
                  <Text style={styles.touchText}>{box.age ? "Young" : "Old"} </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.separator}/>
              <View style={styles.rowView}>
                <Text style={styles.text}>Gender Group:</Text>
                <TouchableOpacity style={styles.info} onPress={this.setGender}>
                  <Text style={styles.touchText}>{box.gender ? "Male" : "Female"} </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.separator}/>
              <View style={styles.rowView}>
                <Text style={styles.text}>Skin Color Group:</Text>
                <TouchableOpacity style={styles.info} onPress={this.setSkinColor}>
                  <Text style={styles.touchText}>{box.skinColor ? "Dark" : "Pale"} </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.luckyButton} onPress={this.lucky}>
                <Text style={styles.buttonText}>I FEEL LUCKY</Text>
              </TouchableOpacity>

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
        </View>}
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
    maxHeight: dHeight * 0.4,
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
  luckyButton: {
    width: "90%",
    backgroundColor:'#F92660',
    borderRadius: 20,
    alignItems: "center",
    marginTop: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    margin: 10,
  }
});