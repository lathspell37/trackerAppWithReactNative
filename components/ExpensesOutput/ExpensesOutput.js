import {View, Text, StyleSheet, FlatList} from 'react-native'
import ExpensesSummary from './ExpensesSummary';
import ExpensesList from './ExpensesList';
import { GlobalStyles } from '../../constants/styles';



function ExpensesOutput({expenses, expensesPeriod}){
    return (
        <View style={styles.container}>
            <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
            <ExpensesList expenses={expenses} />
        </View>
    )
    
}

export default ExpensesOutput;


const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:'15%',
        paddingTop:'15%',
        paddingBottom:0,
        backgroundColor: GlobalStyles.colors.primary700
    }
})