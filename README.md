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
  구조 분해 할당은' 열이나 객체의 속성을 해체하여 그 값을 개별 변수에 담을 수 있게 하는 JavaScript 표현식' 이다.
  ```
  // 이름과 성을 요소로 가진 배열
  let arr = ["Bora", "Lee"]

  // 구조 분해 할당을 이용해
  // firstName엔 arr[0]을
  // surname엔 arr[1]을 할당하였습니다.
  let [firstName, surname] = arr;

  alert(firstName); // Bora
  alert(surname);  // Lee
  ```
  배열에 접근하지 않고도 변수로 이름과 성을 사용할 수 있다.
  구조 분해 할당이 배열에 사용된 것을 볼 수 있다.
  이처럼 구조 분해 할당은 굳이 배열이나 객체들을 직접 접근하지 않고 속성을 해체하며 개별로 담을 수 있게 해준다.  
  
#### 2. {}에 관하여
  객체 리터럴을 만드는 데 사용된다. 즉 객체 리터럴을 정의하기 위해 사용된다.
  예시 코드를 보자면
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
   <Component propName={value} />
   ```
   으로 props를 넘긴다
#### 7. React에서 변수 사용법
  ```
  {variableName}
  ```
  을 통해 변수 값을 사용할 수 있다.
  JSX(JavaScript XML)내에서 {}으로 변수 값을 감싸서
  
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
  Active는 !task.completed를 실행한다
  Completed는 task.completed를 실행한다
  
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
 FILTER_MAP으로 조건 completed로 true,false를 판별해 filter는 true 인 데이터만 허용한다
 그 후 map으로 task 내의 데이터를 하나씩 돌려 프로세스를 진행한다
 
 그런데 task는 코드 내에서 명시적으로 선언되지 않았는데 , 이것은 FILTER_MAP의 과정에서 'task'로 받고 암시적으로 'task'로 선언되는 것이다
 
 filter의 FILTER_MAP의 콜백함수에서 'tasks'가 아닌 'task'를 받으며 암시적으로 이름을 선언한 것을 받는다
 
 즉, FILTER_MAP의 콜백함수로부터 task로 선언된 배열이 필터링에 부합하면 배열에 그 데이터가 포함되고, filter는 그걸 받아 반환한다
 
 그리고  map은 필터링된 배열의 각 작업을 하나씩 처리하고 Component를 생성한다.
 
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
 
콜백함수는 다른 함수의 인수로 사용되거나 이벤트 리스너로부터 호출되는 함수가 콜백 함수이다.
```
function handleClick() {
  alert('Button clicked!');
}

const button = document.querySelector('#myButton');
button.addEventListener('click', handleClick);
```
handleClick은 함수이며, 콜백 함수이다.
addEventListener를 통해 이벤트 핸들러로 함수를 사용하는 것을 확인할 수 있다.

이벤트와 함수를 판가름 하는 것은 다음과 같다.

+ 이벤트는 사용자, 시스템 또는 코드의 다른 부분에 의해 트리거되는 발생 또는 동작이다. 예로는 마우스 클릭, 키 누름, 페이지 로드 또는 서버에서 수신되는 데이터가 있다.
+ 함수는 특정 목적을 위해 작업을 수행하는 재사용 가능한 코드 블록이다.



