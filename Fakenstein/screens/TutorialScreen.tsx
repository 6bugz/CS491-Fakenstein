import React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import {Colors} from '../constants/Colors';

export default function TutorialScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Fakenstein will welcome you with a welcome screen where you could choose
        <Text style={styles.textHighlight}> a single image file</Text> from your device or take a new image from your mobile.
      </Text>
      <Text/>
      <Text style={styles.text}>After approving the image you wish to modify, you will be directed to the Selection Screen.
        In this Screen, we provide you with
        <Text style={styles.textHighlight}> highlighted boxes around the faces
          we could find </Text>
        in the image. The already selected images in the screen are our suggestions of background images to change.
        Please feel free to toggle the faces to alter selection and
        <Text style={styles.textHighlight}> de-select any box that does not contain a human face.</Text>
        Hit the Replace Button to start the 'fake-ifying' process on selected faces.
      </Text>
      <Text/>
      <Text style={styles.text}>
        In the following screen, you will receive the image where the previously selected faces are changed into an artificial face.
        <Text style={styles.textHighlight}> By pressing on the boxes you will open an Editor where you can modify information of
          the generated faces and try out different faces. </Text>
        In case you are not happy with any of the created faces, you can also <Text style={styles.textHighlight}>blur </Text>
        the face of that person. Alternatively, pressing on the <Text style={styles.textHighlight}>"I feel lucky" </Text>
        button will give you a random face from our artificial faces library if you are feeling adventurous. Feel free to
        <Text style={styles.textHighlight}> undo </Text>any new changes you have done in this screen. Click 'Done' when
        you are ready to export the image to your library.
      </Text>
      <Text/>
      <Text style={styles.text}>You can reach the Tutorial screen anytime you are seeing you image and you can go back to the
        Welcome Screen after exporting your image from the home icon on the top right.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.dark.background,
  },
  text: {
    color: Colors.dark.text,
    fontSize: 18,
    fontWeight: '400',
  },
  textHighlight: {
    color: '#F92660',
    fontSize: 18,
    fontWeight: '500',
  },
});
