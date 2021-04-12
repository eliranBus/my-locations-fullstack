import React, {useCallback} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toggleTheme from '../redux/actions/themeActions';
import { ToggleContainer } from '../assets/styles/toggleStyles';
import { ReactComponent as MoonIcon } from '../assets/images/moon.svg';
import { ReactComponent as SunIcon } from '../assets/images/sun.svg';

const Toggle = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const isLight = theme === 'light';

  const changeTheme = useCallback(() => {
    dispatch(toggleTheme());
  }, [dispatch]);

  return (
    <ToggleContainer lightTheme={isLight} onClick={changeTheme}>
      <SunIcon />
      <MoonIcon />
    </ToggleContainer>
  );
};

export default Toggle;
