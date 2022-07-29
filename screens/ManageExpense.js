import {Text, StyleSheet, View} from 'react-native'
import {useContext, useLayoutEffect, useState} from 'react'
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import {ExpensesContext} from '../store/expenses-context'
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import { storeExpense, updateExpense, deleteExpense } from '../util/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

function ManageExpense({route, navigation}){

    const [isAdding, setIsAdding] = useState(false);
    const [error, setError] = useState();

    const expensesCtx = useContext(ExpensesContext);

    const editedExpenseId = route.params?.expenseId; // ? checks params defined or undefined. if undefined wont drill expenseId else drill it
    const isEditing = !!editedExpenseId; // !! is turns a variable into boolean

    const selectedExpense = expensesCtx.expenses.find(expense => expense.id === editedExpenseId);

    useLayoutEffect(()=>{
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        })
    }, [navigation,isEditing]);


    if(error && !isAdding){
        return(
            <ErrorOverlay message={error} />
        )
    }

    if(isAdding){
        return (
            <LoadingOverlay />
        );
     }

    async function deleteExpenseHandler(){
        setIsAdding(true);
        try {
            await deleteExpense(editedExpenseId);
            expensesCtx.deleteExpense(editedExpenseId);
            navigation.goBack();
        } catch (error) {
            setError('Could not delete expense')
            setIsAdding(false);
        }

        
        
    }

    function cancelHandler(){
        navigation.goBack();
    }

    async function confirmHandler(expenseData){
        setIsAdding(true);
        try {
            if(isEditing){
                expensesCtx.updateExpense(editedExpenseId, expenseData);
                await updateExpense(editedExpenseId,expenseData);
            } else{
                const id = await storeExpense(expenseData);
                expensesCtx.addExpense({...expenseData, id:id});
            }
            navigation.goBack();
        } catch (error) {
            setError('Could not save expense');
            setIsAdding(false);
        }

        
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