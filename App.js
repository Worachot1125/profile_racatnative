import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import PieChart from 'react-native-pie-chart';



export default function App() {
  return (
    <ScrollView contentContainerStyle={styles.wrapper}>
      <StatusBar style="auto" />

      <Image
        source={require('./assets/image/worachot.jpg')}
        style={styles.image}
      />

      <Text style={styles.topic}>โปรไฟล์ของฉัน</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>ชื่อ: นายวรโชติ ทองเลิศ</Text>
        <Text style={styles.infoText}>รหัส: 653450299-0</Text>
        <Text style={styles.infoText}>สาขาวิทยาการคอมพิวเตอร์และสารสนเทศ</Text>
        <Text style={styles.infoText}>มหาวิทยาลัยขอนแก่น</Text>
      </View>
      <Sidetopic />


    </ScrollView>
  );
}
export function Sidetopic() {
  const widthAndHeight = 150;
  const series = [
    { value: 20, color: '#f94144', labels: 'HTML' },
    { value: 15, color: '#f3722c', labels: 'CSS' },
    { value: 25, color: '#f8961e', labels: 'JavaScript' },
    { value: 20, color: '#f9844a', labels: 'Go' },
    { value: 10, color: '#43aa8b', labels: 'Vue' },
    { value: 10, color: '#577590', labels: 'React' },
    { value: 10, color: '#277da1', labels: 'Flutter' },
    { value: 10, color: '#90be6d', labels: 'Python' },
  ];
  const sliceColor = series.map(item => item.color);
  const labels = series.map(item => item.labels);

  return (
    <ScrollView contentContainerStyle={styles.wrapper}>
      <Text style={styles.topic}>My Skill</Text>

      <PieChart
        widthAndHeight={widthAndHeight}
        series={series}
        coverRadius={0.45}
        coverFill={'#f9f9f9'}
      />

      <View style={{ marginTop: 20 }}>
        {labels.map((label, index) => (
          <Text key={index} style={{ color: sliceColor[index], fontSize: 16, marginBottom: 4 }}>
            ● {label}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: 60,
    paddingBottom: 60,
    backgroundColor: '#FAF8F1',
    alignItems: 'center',
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: 80,
    marginBottom: 20,
    borderWidth: 4,
    borderColor: '#A0C4FF',
  },
  topic: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#3D405B',
    marginBottom: 30,
    letterSpacing: 1,
  },
  sidetopic: {
    fontSize: 20,
    fontWeight: '600',
    color: '#3D405B',
    marginBottom: 30,
    textAlign: 'left',
  },
  infoContainer: {
    paddingHorizontal: 20,
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
    paddingVertical: 25,
    marginBottom: 40,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
    color: '#5C5F66',
    marginBottom: 8,
    textAlign: 'center',
    lineHeight: 22,
  },
});