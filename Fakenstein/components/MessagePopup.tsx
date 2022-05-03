import React, {useEffect} from "react";
import {Text, Animated, Modal, StyleSheet, TouchableOpacity, View} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

type Props = {
  success: boolean;
  message: string;
  visible: boolean;
  setVisible: any;
}
export default function MessagePopup({success, message, visible, setVisible}: Props) {

  const [showModal, setShowModal] = React.useState(visible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    toggleModal();
  }, [visible]);

  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };


  return (
    <Modal transparent visible={showModal}>
      <View style={styles.container}>
        <Animated.View style={[styles.modalContainer, {transform: [{scale: scaleValue}]}]}>
          <View style={{alignItems: 'center'}}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => setVisible(false)}>
                <AntDesign name="close" size={30} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          {!!success &&
            <View style={{alignItems: 'center', marginVertical: 10}}>
              <FontAwesome5 name="check-circle" size={150} color="green"/>
            </View>
          }
          <Text style={{marginVertical: 30, fontSize: 20, textAlign: 'center'}}>
            {message}
          </Text>
        </Animated.View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: "#000000AA",
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});