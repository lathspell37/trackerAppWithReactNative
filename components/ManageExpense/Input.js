import {View, Text, TextInput, StyleSheet} from 'react-native'
import { GlobalStyles } from '../../constants/styles';

function Input({label, textInputConfig, style}){

    const inputStyles = [styles.input];

    if(textInputConfig && textInputConfig.multiline){
        inputStyles.push(styles.inputMultiLine)
    }

    return (
        <View style={[styles.inputContainer, style]}>
            <Text style={styles.label}> {label} </Text>
            <TextInput style={styles.input} {...textInputConfig} />
        </View>
    )
}

export default Input;

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal:'2%',
        marginVertical:'3%',
    },
    label:{
        fontSize:12,
        color: GlobalStyles.colors.primary100,
        marginBottom:'3%'
    },
    input:{
        backgroundColor:GlobalStyles.colors.primary100,
        padding: '3%',
        fontSize:18,
        borderRadius:6,
        color: GlobalStyles.colors.primary700
    },
    inputMultiLine:{
        minHeight:300,
        textAlignVertical:'top'
    }
})