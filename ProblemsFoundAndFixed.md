# Unrecognized Font 'Font Name' 
** Usually a react-native-vector-font **
in my case - Ant Icon

Solution: Just import that font and load it before using.

```
import AntDesign from 'react-native-vector-icons/AntDesign';
AntDesign.loadFont();
```