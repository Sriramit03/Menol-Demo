import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import CustomHeader from '../../components/CustomHeader';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../utils/theme';

const FAQs = [
  {
    id: 1,
    question: 'How do I place an order?',
    answer:
      "To place an order, browse products, tap on the one you like, select the size and color, and tap the 'Add to Cart' button. Then, go to your cart and proceed to checkout.",
  },
  {
    id: 2,
    question: 'How can I track my order?',
    answer:
      "Once your order is shipped, you'll receive a tracking ID via SMS or email. You can also track it from the 'Orders' section in your Profile tab.",
  },
  {
    id: 3,
    question: 'Can I cancel or modify my order after placing it?',
    answer:
      "Yes! You can cancel or modify your order before it is shipped. Go to 'My Orders' and choose the order you want to cancel.",
  },
  {
    id: 4,
    question: 'What payment methods are accepted?',
    answer:
      'We accept UPI, credit/debit cards, net banking, and cash on delivery (COD) in select regions.',
  },
  {
    id: 5,
    question: 'Is it safe to use my credit/debit card on this app?',
    answer:
      'Absolutely. We use secure payment gateways and your data is encrypted to ensure 100% safety.',
  },
  {
    id: 6,
    question: 'Do you offer returns and exchanges?',
    answer:
      'Yes, we offer easy 7-day returns and exchanges for most products. Make sure the product is unused and in original condition.',
  },
  {
    id: 7,
    question: 'How do I apply a promo code?',
    answer:
      "During checkout, you’ll see an option to apply a promo code. Enter the code and tap 'Apply' to see the discount.",
  },
  {
    id: 8,
    question: "Why is an item showing as 'Out of Stock'?",
    answer:
      "Popular products tend to sell out quickly. You can tap 'Notify Me' on the product page to get alerts when it's back in stock.",
  },
  {
    id: 9,
    question: 'Do you offer free shipping?',
    answer:
      'We offer free shipping on orders above ₹499. Shipping charges may apply to smaller orders.',
  },
  {
    id: 10,
    question: 'How can I contact customer support?',
    answer:
      "You can reach out to us via the 'Help & Support' section in the app or email us at support@menol.com.",
  },
];

export const Question = ({item, selectedQuestion, setSelectedQuestion}) => {
  const addSelectedQuestion = id => {
    if (selectedQuestion === id) setSelectedQuestion(0);
    else {
      setSelectedQuestion(id);
    }
  };
  return (
    <>
      <TouchableOpacity
        style={questionStyles.container}
        onPress={() => addSelectedQuestion(item.id)}>
        <View style={questionStyles.textContainer}>
          <Text style={questionStyles.questionText}>{item.question}</Text>
        </View>
        {item.id === selectedQuestion ? (
          <FontAwesome
            name="angle-down"
            size={24}
            color={colors.primaryBlack}
          />
        ) : (
          <FontAwesome
            name="angle-right"
            size={24}
            color={colors.primaryBlack}
          />
        )}
      </TouchableOpacity>
      {item.id === selectedQuestion && (
        <Text style={questionStyles.answerText}>{item.answer}</Text>
      )}
    </>
  );
};

const HelpCenter = ({navigation}) => {
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  return (
    <>
      <CustomHeader
        title={'Help Center'}
        backFunc={() => navigation.goBack()}
      />
      <ScrollView style={styles.container}>
        {FAQs.map(item => (
          <Question
            item={item}
            key={item.id}
            selectedQuestion={selectedQuestion}
            setSelectedQuestion={setSelectedQuestion}
          />
        ))}
      </ScrollView>
    </>
  );
};

export default HelpCenter;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: '5%',
    marginBottom: 80,
  },
});

const questionStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  questionText: {
    letterSpacing: 3,
    fontSize: 16,
    fontWeight: '600',
  },
  textContainer: {
    width: '90%',
  },
  answerText: {
    letterSpacing: 3,
    fontSize: 16,
    textAlign: 'justify',
  },
});
