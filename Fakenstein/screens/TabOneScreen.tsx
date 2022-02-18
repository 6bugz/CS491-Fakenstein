import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import Colors from '../constants/Colors';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'Fakenstein'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fakenstein</Text>
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000'
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: Colors.original.text,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    backgroundColor: '#178C6C',
  },
});
