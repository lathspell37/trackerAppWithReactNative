import { Pressable, StyleSheet, View, Text } from 'react-native'
import { GlobalStyles } from '../../constants/styles';
import { getFormattedDate } from '../../util/date';
import {useNavigation} from '@react-navigation/native'

function ExpenseItem({id, description, amount, date}){

    const navigation = useNavigation();

    function expensePressHandler(){
        navigation.navigate('ManageExpense', {
            expenseId: id
        })
    }

    return (
        <Pressable style={({pressed}) => pressed && styles.pressed} onPress={expensePressHandler}>
            <View style={styles.expenseItem}>
                <View>
                    <Text style={[styles.textBase, styles.description]}> {description} </Text>
                    <Text style={styles.textBase}> {getFormattedDate(date)} </Text>
                </View> 
                <View style={styles.amountContainer}>
                    <Text style={styles.amount}> {amount.toFixed(2)} </Text> 
                </View>               
                               
            </View>
        </Pressable>
    )
}

export default ExpenseItem;

const styles = StyleSheet.create({
    expenseItem:{
        padding: '8%',
        marginVertical:'5%',
        backgroundColor: GlobalStyles.colors.primary500,
        flexDirection:'row',
        justifyContent:'space-between',
        borderRadius:6,
        elevation:3,
        shadowColor:GlobalStyles.colors.gray500,
        shadowOffset:{width:1, height:1},
        shadowRadius:4,
        shadowOpacity:0.4
    },
    textBase:{
        color: GlobalStyles.colors.primary50,
    },
    description:{
        fontSize:16,
        marginBottom:'2%',
        fontWeight:'bold'
    },
    amountContainer:{
        paddingHorizontal:'8%',
        paddingVertical:'2%',
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:4,
        minWidth: 80
    },
    amount:{
        color:GlobalStyles.colors.primary500,
        fontWeight:'bold'
    },
    pressed:{
        opacity:0.75
    }
})