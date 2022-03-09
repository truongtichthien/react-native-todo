import { useState } from 'react';
import {
  Platform, KeyboardAvoidingView, StyleSheet,
  Text, View, TextInput, TouchableOpacity, Button
} from 'react-native';
import Task from './components/Task';

const TAB_INDEX = {
  ALL: 0,
  INCOMPLETE: 1,
  COMPLETE: 2
}

export default function App() {
  const [tab, setTab] = useState(TAB_INDEX.ALL);
  const [newTask, setNewTask] = useState('');
  const [allTasks, setAllTasks] = useState({ '0': { id: '0', name: 'Task 1', complete: true }, '1': { id: '1', name: 'Task 2', complete: false } });

  const handleAddTask = () => {
    if (newTask.length > 0) {
      const id = `${Date.now()}`;
      setAllTasks({ ...allTasks, [id]: { id, name: newTask, complete: false }});
      setNewTask('');
    }
  };

  const handleCompleteTask = (id) => {
    const task = { ...allTasks[id] };
    setAllTasks({ ...allTasks, [id]: { ...task, complete: !task.complete } })
  };

  return (
    <View style={styles.container}>
      <View style={styles.taskWrapper}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>
        <View style={styles.tabBar}>
          <View style={styles.tab}>
            <Button
              onPress={() => setTab(TAB_INDEX.ALL)}
              title="All"
              color={tab === TAB_INDEX.ALL && 'red'}
              accessibilityLabel="All Tasks" />
          </View>
          <View style={styles.tab}>
            <Button
              onPress={() => setTab(TAB_INDEX.INCOMPLETE)}
              title="Incomplete"
              color={tab === TAB_INDEX.INCOMPLETE && 'red'}
              accessibilityLabel="Incomplete Tasks" />
          </View>
          <View style={styles.tab}>
            <Button
              onPress={() => setTab(TAB_INDEX.COMPLETE)}
              title="Complete"
              color={tab === TAB_INDEX.COMPLETE && 'red'}
              accessibilityLabel="Complete Tasks" />
          </View>
        </View>
        <View style={styles.items}>
          {Object.values(allTasks)
            .filter(({ complete }) => {
              if (tab === TAB_INDEX.ALL) {
                return true;
              } else {
                return tab === TAB_INDEX.COMPLETE ? complete : !complete;
              }
            }).map(({ id, name, complete }, idx) => (
              <TouchableOpacity key={id} onPress={() => handleCompleteTask(id)}>
                <Task text={name} complete={complete} />
              </TouchableOpacity>))}
        </View>
      </View>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.inputTaskWrapper}>
        <TextInput
          style={styles.input}
          placeholder={'Write a task'}
          value={newTask}
          onChangeText={t => setNewTask(t)} />

        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8eaed',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  taskWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  tabBar: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  tab: {
    marginRight: 10
  },
  items: {
    marginTop: 30
  },
  inputTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 60,
    borderColor: '#c0c0c0',
    borderWidth: 1,
    width: '70%'
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#c0c0c0',
    borderWidth: 1
  },
  addText: {}
});
