import React from "react";
import {Modal, StyleSheet, TouchableWithoutFeedback, View} from "react-native";
import {dHeight} from "../constants/utils";
import {Text} from "./Themed";

export default class EditPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    }
  }

  show = (box) => {
    console.log(box)
    this.setState({show: true});
  }

  close = () => {
    this.setState({show: false});
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
    const {show} = this.state;
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
              <Text style={styles.text}>Age Group:</Text>
              <View style={styles.separator}/>
              <Text style={styles.text}>Gender Group:</Text>
              <View style={styles.separator}/>
              <Text style={styles.text}>Skin Color Group:</Text>
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
  }
});