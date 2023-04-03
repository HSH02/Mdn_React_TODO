# 프로젝트 모르던 것 정리 

#### 1.[ ]에 관하여
  useState 코드 부분의 []는 ES6의 기능 중 하나인 구조 분해 할당에 속한다.
  useState는 [first_argument, setter_argument]로 두 가지 요소로 나눠지는 배열을 만든다.
  ```
  const [tasks, setTasks ] = useState(props.tasks);
  ```
  위 코드를 보면 tasks는 첫 번째 인수로, props.tasks 값으로 초기화 된다.
  setTasks는 타 메서드, 함수로 필요할 때 tasks를 업데이트 하는데 사용된다.
  예시 코드를 보면
  ```
  function addTask(name){    
    const newTask = { id: `todo-${nanoid()}`,name, completed:false};
    setTasks([...tasks, newTask]);    
  }
  ```
  setTasks를 통해 새로운 newTask를 스프레드 연산자로 ...tasks 인 기본 배열을 복사하고 addTask를 붙여 새 복사본을 만들어 task로 설정한다.
  
  만약 [] 없이 코드를 표현하려 한다면
  ```
  const tasksState = useState(props.tasks);
  const tasks = tasksState[0];
  const setTasks = tasksState[1];
  ```
  
#### 2. {}에 관하여
  객체 리터럴을 만드는 데 사용된다. 예시 코드를 보자면
  ```
  const newTask = { id: todo-${nanoid()}, name, completed: false };
  ```
  id, name 및 completed 속성이 있는 객체가 생성된다.
#### 3. lable 태그에 관하여

  먼저 label은 코드 내에서 특정 위치를 표시하는 것이다.
  프로젝트 내 label은 입력 요소, 제목에 대한 레이블을 정의하고 있고, htmlFor 속성은 요소의 id를 통해 특정 입력 요소와 연결 시킨다.
  
#### 4. aria-pressed?

   토글 버튼이 눌린 상태를 나타내는 속성
   
#### 5. aria-labelledby?

   레이블을 요소와 연결하는 데 사용되는 HTML 속성
   
#### 6. props를 넘기는 방법
   ```
   name={propName}
   ```
   으로 props를 넘긴다
#### 7. React에서 변수 사용법
  ```
  {variableName}
  ```
  을 통해 변수 값을 사용할 수 있다
#### 8. 필터링 
  ```
  const FILTER_MAP = {
    All: () => true,
    Active: (task) => !task.completed,
    completed: (task) => task.completed
  }
  ```
  에서는 key:value 형식으로 
  All 은 모든 작업에 true를 반환하고
  Active는 완료되지 않는 작업에 true를 반환한다.
  Completed는 완료된 작업에 true를 반환한다.
  
  ```
  const FILTER_NAMES = Object.keys(FILTER_MAP);
  ```
  Object.keys를 통해 FILTER_MAP의 key만을 가져와 ['All','Active','completed'] 배열로 선언한다.
  
  ```
  function usePrevious(value){
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    }); 
    return ref.current;
  }
  ```
  지정된 변수의 이전 값을 저장하고 반환하는 사용자 지정 hook이다.
  hooks, useRef, useEffect는 아래에 서술한다.
  
  ```
  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton 
        key={name}
        name={name}
        isPressed={name === filter}
        setFilter={setFilter}
    />
  ));
  ```
 FILTER_NAMES의 배열은 All, Active, Completed를 map()으로 차례대로 만들어서 FlilterButton이 세 개의 버튼을 만들게 한다.
 버튼이 클릭될 때 filter를 업데이트 하는 setFilter를 전달한다.
 
 ```
 const taskList = 
    tasks
  .filter(FILTER_MAP[filter])
  .map((task) => 
    <Todo 
        id={task.id}
        name={task.name} 
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
    />
  );
 ```
 FILTER_MAP으로 조건 completed로 true,false를 판별해 filter는 true 인 데이터만 허용한다.
 그 후 map으로 task 내의 데이터를 하나씩 돌려 작업을 진행한다.
 
 그런데 task는 코드 내에서 명시적으로 선언되지 않았는데 , 이것은 FILTER_MAP의 과정에서 'task'로 받고 암시적으로 'task'로 선언되는 것이다.
 즉, filter의 FILTER_MAP과정에서 'tasks'가 아닌 'task'를 받으며 암시적으로 이름을 선언한 것을 받는다
 filter는 true,false로 필터링을 판별한 후 'tasks' 아닌 'task'로 선언된 것을 배열로 반환하고 map은 그 task를 받아서 과정을 처리하는 것이다
 task를 apple, banana처럼 바꿔서 다른 변수 이름처럼 바꿔서 사용할 수 있다
 ```
   const FILTER_MAP = {
    All: () => true,
    Active: (apple) => !apple.completed,
    completed: (apple) => apple.completed,
  };

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((apple) => (
      <Todo
        id={apple.id}
        name={apple.name}
        completed={apple.completed}
        key={apple.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));
 ```
이러면 filter가 반환하는 것이 task가 아닌 apple이 될 것이다.
 
