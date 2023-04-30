import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Todo = ({todo,setTodos, todos}) => {

    const [edit,setEdit]=useState(false)
    const [editText,setEditText]=useState(todo.text)

    useEffect(()=>{
        AsyncStorage.setItem("todos",JSON.stringify(todos))
    },[todos])

    const editHandler=()=>{
        if(!edit){
            setEdit(!edit)
        }
        else{
            setEdit(!edit);
            setTodos(
              todos.map((t) =>
                t.id === todo.id
                  ? {
                      id: t.id,
                      text: editText,
                    }
                  : t
              )
            );
            AsyncStorage.setItem("todos",JSON.stringify(todos))
        }
    }

    const deleteHandler=(id)=>{
        setTodos(todos.filter((t)=>t.id!==id));
    }

    return (
        <View style={styles.todo}>
            {
                !edit ? (
                    <Text style={styles.todText}>{todo.text}</Text>
                  ) : (
                    <TextInput
                      onChangeText={(text) => setEditText(text)}
                      style={styles.todoInput}
                      value={editText}
                    />
                  )
            }
           
            <TouchableOpacity style={styles.action}>
                <MaterialIcons
                    style={styles.todoAction}  
                    name="edit" size={24} 
                    color="black" 
                    onPress={editHandler}/>

                <MaterialIcons 
                    style={styles.todoAction} 
                    name="delete" size={24} 
                    color="black" 
                    onPress={()=>deleteHandler(todo.id)}/>
            </TouchableOpacity>
            
        </View>
    )
}

export default Todo

const styles=StyleSheet.create({
    todo: {
        flexDirection: "row",
        marginHorizontal: 10,
        elevation: 5,
        shadowColor: "black",
        backgroundColor: "white",
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 10,
        borderRadius: 50,
        justifyContent:"space-between"
    },
    todoText: {
        flex: 1,
        fontSize: 18,
        paddingVertical: 3,
        paddingHorizontal: 5,
    },
    todoInput: {
        flex: 1,
        fontSize: 18,
        paddingHorizontal: 5,
        borderRadius: 5,
        borderColor: "grey",
        borderWidth: 1,
    },
    action:{
        flexDirection:"row"
    },
    todoAction: {
        marginLeft: 15,
    },
});
