import { useState } from 'react';
import {View, StyleSheet, Text, Alert } from 'react-native'
import Input from './Input';
import Button from '../UI/Buttons';
import { getFormattedDate } from '../../util/date';
import { GlobalStyles } from '../../constants/styles';

function ExpenseForm({onCancel, onSubmit, submitButtonLabel, defaultValues}){

    const [inputs, setInputs] = useState({
        amount: {value : defaultValues ? defaultValues.amount.toString() : '',
                isValid: true},
        date: {value: defaultValues ? getFormattedDate(defaultValues.date) : '',
               isValid: true},
        description: {value : defaultValues ? defaultValues.description : '',
                      isValid: true}
    });

    function inputChangeHandler( inputIdentifier, enteredValue){
        setInputs((curInputs) => {
            return {
                ...curInputs,
                [inputIdentifier]: {value: enteredValue, isValid: true}
            }
        });
    }

    function submitHandler(){
        
        const expenseData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value
        }
        
        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0 
        const dateIsValid = (expenseData.date.toString() !== 'Invalid Date')
        const descriptionIsValid = expenseData.description.trim().length > 0;

        if(!amountIsValid || !dateIsValid || !descriptionIsValid ){
            
            setInputs( (curInputs) => {
                return{
                    amount: {value: curInputs.amount.value, isValid: amountIsValid},
                    date: {value: curInputs.date.value, isValid: dateIsValid},
                    description: {value: curInputs.description.value, isValid: descriptionIsValid}
                }
            } )
            return;
        }

        onSubmit(expenseData);
    }

    const formIsValid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputsRow}>
                <Input invalid={!inputs.amount.isValid} style={styles.rowInput} label="Amount" textInputConfig={{
                    keyboardType: 'decimal-pad',
                    onChangeText: inputChangeHandler.bind(this, 'amount'),
                    value: inputs.amount.value
                }} />
                <Input invalid={!inputs.date.isValid} style={styles.rowInput} label="Date" textInputConfig={{
                    placeholder: "YYYY-MM-DD",
                    maxLength: 10,
                    onChangeText: inputChangeHandler.bind(this, 'date'),
                    value: inputs.date.value
                }} />
            </View>
            
            <Input invalid={!inputs.description.isValid} label="Description" textInputConfig={{
                multiLine: true,
                autoCorrect: false, //default is true      
                onChangeText: inputChangeHandler.bind(this, 'description'),
                value: inputs.description.value         
            }} />

            {formIsValid && (<Text style={styles.errorText}>Invalid input values, please check your inputs</Text>)}
            
            <View style={styles.buttonContainer}>
                <Button style={styles.button} mode='flat' onPress={onCancel} >Cancel</Button>
                <Button style={styles.button} onPress={submitHandler} >{submitButtonLabel}</Button>
            </View>
        </View>
    )
}

export default ExpenseForm;

const styles = StyleSheet.create({
    inputsRow:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    rowInput:{
        flex:1
    },
    form:{
        marginTop:'10%'
    },
    title:{
        fontSize:24,
        fontWeight:'bold',
        color:'white',
        textAlign:'center',
        marginVertical:'12%'

    },
    buttonContainer:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    button:{
        minWidth:'20%',
        marginHorizontal:'5%'
    },
    errorText:{
        textAlign:'center',
        color: GlobalStyles.colors.error500,
        margin:'5%',
        fontWeight:'bold'
    },
})