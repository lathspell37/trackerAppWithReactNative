import {View, Text, StyleSheet, FlatList} from 'react-native'
import ExpensesSummary from './ExpensesSummary';
import ExpensesList from './ExpensesList';
import { GlobalStyles } from '../../constants/styles';

const DUMMY_EXPENSES = [
    {
    id: 'e1',
    description: 'shoes',
    amount: 59.99,
    date: new Date('2021-12-19')
    },
    {
        id: 'e2',
        description: 'trousers',
        amount: 89.99,
        date: new Date('2022-01-05')
    },
    {
        id: 'e3',
        description: 'bananas',
        amount: 5.99,
        date: new Date('2021-12-01')
    },
    {
        id: 'e4',
        description: 'book',
        amount: 14.99,
        date: new Date('2022-02-19')
    },
    {
        id: 'e5',
        description: 'book',
        amount: 18.59,
        date: new Date('2022-02-18')
    },
    {
        id: 'e6',
        description: 'shoes',
        amount: 59.99,
        date: new Date('2021-12-19')
        },
        {
            id: 'e7',
            description: 'trousers',
            amount: 89.99,
            date: new Date('2022-01-05')
        },
        {
            id: 'e8',
            description: 'bananas',
            amount: 5.99,
            date: new Date('2021-12-01')
        },
        {
            id: 'e9',
            description: 'book',
            amount: 14.99,
            date: new Date('2022-02-19')
        },
        {
            id: 'e10',
            description: 'book',
            amount: 18.59,
            date: new Date('2022-02-18')
        },
    
]

function ExpensesOutput({expenses, expensesPeriod}){
    return (
        <View style={styles.container}>
            <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />
            <ExpensesList expenses={DUMMY_EXPENSES} />
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