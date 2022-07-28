import {View, Text, TextInput, StyleSheet} from 'react-native'
import { GlobalStyles } from '../../constants/styles';

function Input({label, invalid, textInputConfig, style}){

    const inputStyles = [styles.input];

    if(textInputConfig && textInputConfig.multiline){
        inputStyles.push(styles.inputMultiLine)
    }

    if(invalid){
        inputStyles.push(styles.invalidInput);
    }

    return (
        <View style={[styles.inputContainer, style]}>
            <Text style={[styles.label, invalid && styles.invalidLabel]}> {label} </Text>
            <TextInput style={inputStyles} {...textInputConfig} />
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
    },
    invalidLabel:{
        color: GlobalStyles.colors.error500
    },
    invalidInput:{
        backgroundColor: GlobalStyles.colors.error50
    }
})