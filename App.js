import React
, { useEffect,
useState } from "react";
import { StyleSheet, View, Text, StatusBar, TextInput, TouchableOpacity, ScrollView, FlatList } from "react-native";
import Todo from "./components/Todo";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [todo, setTodo]=useState('')
  const [todos,setTodos]=useState([])

  const addHandler=()=>{
    if(!todo){return}

    setTodos([...todos,{id:Date.now(),text:todo}])

    setTodo("")
  }

  const  fetchTodos = async()=>{
    const data=await AsyncStorage.getItem("todos")
    if(data){
      setTodos(JSON.parse(data))
    }
  }

useEffect(()=>{
  fetchTodos()
},[])

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Todo App</Text>
      <View style={styles.inputContainer}>
        <TextInput 
          placeholder="Enter todo"
          style={styles.input}
          onChangeText={(text)=>setTodo(text)}
          value={todo}/>
        
        <TouchableOpacity onPress={addHandler}>
          <Text style={styles.button}>Go</Text>
        </TouchableOpacity> 
      </View>

      {/* <ScrollView>
        {todos.map(todo=>(
          <Text>{todo.text}</Text>
        ))}
      </ScrollView> */}
      <View style={{width:"100%",marginTop:10}}>
        <FlatList
          data={todos}
          renderItem={
            ({item})=><Todo 
            todo={item}
            todos={todos} 
            setTodos={setTodos}/>
          }
          keyExtractor={(item)=>item.id.toString()}
        />
      </View>
      

      <StatusBar style="auto"/>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:"center",
    backgroundColor:"#f7d7D7"
  },
  heading:{
    marginVertical:10,
    fontSize:30,
    fontWeight:"700"
  },
  inputContainer:{
    flexDirection:"row",
    marginHorizontal:10,
    alignItems:"center"
  },
  input:{
    flex:1,
    shadowColor:"black",
    backgroundColor:"white",
    elevation:10,
    marginRight:5,
    paddingHorizontal:20,
    paddingVertical:10,
    borderRadius:50,
    
  },
  button:{
    padding: 13,
    backgroundColor: "white",
    borderRadius: 50,
    elevation: 10
  }
});
