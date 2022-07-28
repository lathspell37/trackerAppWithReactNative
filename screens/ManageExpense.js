import {Text, StyleSheet, View} from 'react-native'
import {useContext, useLayoutEffect} from 'react'
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import {ExpensesContext} from '../store/expenses-context'
import ExpenseForm from '../components/ManageExpense/ExpenseForm';


function ManageExpense({route, navigation}){

    const expensesCtx = useContext(ExpensesContext);

    const editedExpenseId = route.params?.expenseId; // ? checks params defined or undefined. if undefined wont drill expenseId else drill it
    const isEditing = !!editedExpenseId; // !! is turns a variable into boolean

    const selectedExpense = expensesCtx.expenses.find(expense => expense.id === editedExpenseId);

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

    function confirmHandler(expenseData){
        if(isEditing){
            expensesCtx.updateExpense(editedExpenseId, expenseData);
        } else{
            expensesCtx.addExpense(expenseData);
        }
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <ExpenseForm onCancel={cancelHandler} 
            submitButtonLabel={isEditing ? 'Update' : 'Add'}
            onSubmit={confirmHandler}
            defaultValues={selectedExpense} />

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

})