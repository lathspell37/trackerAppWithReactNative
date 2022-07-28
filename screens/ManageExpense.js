import {Text, StyleSheet, View} from 'react-native'
import {useContext, useLayoutEffect} from 'react'
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import Button from '../components/UI/Buttons';
import {ExpensesContext} from '../store/expenses-context'
import ExpenseForm from '../components/ManageExpense/ExpenseForm';

function ManageExpense({route, navigation}){

    const expensesCtx = useContext(ExpensesContext);

    const editedExpenseId = route.params?.expenseId; // ? checks params defined or undefined. if undefined wont drill expenseId else drill it
    const isEditing = !!editedExpenseId; // !! is turns a variable into boolean

    useLayoutEffect(()=>{
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        })
    }, [navigation,isEditing]);

    function deleteExpenseHandler(){
        expensesCtx.deleteExpense(editedExpenseId);
        navigation.goBack();
        
    }

    function cancelHandler(){
        navigation.goBack();
    }

    function confirmHandler(){
        if(isEditing){
            expensesCtx.updateExpense(
            editedExpenseId,
                {
                    description: 'Test',
                    amount: 12.22,
                    date: new Date('2022-07-22')
                });
        } else{
            expensesCtx.addExpense({
                description: 'Test',
                amount: 12.22,
                date: new Date('2022-07-22')
            });
        }
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <ExpenseForm />
            <View style={styles.buttonContainer}>
                <Button style={styles.button} mode='flat' onPress={cancelHandler} >Cancel</Button>
                <Button style={styles.button} onPress={confirmHandler} >{isEditing ? 'Update' : 'Add'}</Button>
            </View>
            {isEditing && 
            <View style={styles.deleteContainer}>
                <IconButton 
                icon='trash' 
                color={GlobalStyles.colors.error500}
                size={24}
                onPress={deleteExpenseHandler} />
            </View>
}
        </View>
    )
}

export default ManageExpense;

const styles = StyleSheet.create({
    deleteContainer:{
        marginTop:'8%',
        paddingTop:'5%',
        borderTopWidth:2,
        borderTopColor:GlobalStyles.colors.primary200,
        alignItems:'center'        
    },
    container:{
        flex:1,
        padding:'10%',
        backgroundColor: GlobalStyles.colors.primary800
    },
    buttonContainer:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    button:{
        minWidth:'20%',
        marginHorizontal:'5%'
    }
})