import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

const HowItWorksScreen = () => {
  const steps = [
    {
      icon: '☁️',
      title: 'Submit a Case',
      description: 'Upload plant images and describe symptoms through our simple form',
    },
    {
      icon: '🖼️',
      title: 'Image Processing',
      description: 'Our system analyzes images for disease patterns',
    },
    {
      icon: '✔️',
      title: 'Case Review',
      description: 'Agricultural experts verify each submission',
    },
    {
      icon: '🤖',
      title: 'AI Diagnosis',
      description: 'Get instant preliminary results from our trained models',
    },
    {
      icon: '👤',
      title: 'Personalized Help',
      description: 'Receive tailored recommendations for treatment',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How FarmSense Works</Text>
      <Text style={styles.subtitle}>
        Get expert help for your crops in just a few simple steps
      </Text>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {steps.map((step, index) => (
          <View key={index} style={styles.stepBox}>
            <Text style={styles.icon}>{step.icon}</Text>
            <Text style={styles.stepTitle}>{step.title}</Text>
            <Text style={styles.stepDescription}>{step.description}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0f0d',
    paddingTop: 45,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#90ee90',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#aaa',
    textAlign: 'center',
    marginBottom: 20,
  },
  scrollContainer: {
    paddingBottom: 20,
    alignItems: 'center',
  },
  stepBox: {
    backgroundColor: '#1c2a36',
    borderRadius: 16,
    padding: 20,
    marginVertical: 10,
    width: '90%',
    alignItems: 'center',
  },
  icon: {
    fontSize: 40,
    marginBottom: 10,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 6,
  },
  stepDescription: {
    fontSize: 14,
    color: '#90ee90',
    textAlign: 'center',
  },
});


export default HowItWorksScreen;
