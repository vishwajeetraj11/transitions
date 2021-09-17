# Unrecognized Font 'Font Name' 
** Usually a react-native-vector-font **
in my case - Ant Icon

Solution: Just import that font and load it before using.

```
import AntDesign from 'react-native-vector-icons/AntDesign';
AntDesign.loadFont(); 

- A1 - Animation One
The images transitioning from 2nd screen to 1st screen will flicker or translate which can be fixed by changing Navigator options ```<Stack.Screen option={{}}>```
```