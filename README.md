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
   
  
