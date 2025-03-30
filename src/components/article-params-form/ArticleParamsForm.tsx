import { useState, useRef, useEffect} from 'react';
import clsx from 'clsx';

import { OptionType, ArticleStateType} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import { defaultArticleState, fontFamilyOptions, fontSizeOptions, fontColors, backgroundColors, contentWidthArr } from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type TFormProps = {
	setAppState?: (value: ArticleStateType) => void;
}

export const ArticleParamsForm = ({ setAppState }: TFormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [family, setFamily] = useState<OptionType>(defaultArticleState.fontFamilyOption);
	const [size, setSize] = useState<OptionType>(defaultArticleState.fontSizeOption);
	const [fontColor, setFontColor] = useState<OptionType>(defaultArticleState.fontColor);
	const [backgroundColor, setBackgroundColor] = useState<OptionType>(defaultArticleState.backgroundColor);
	const [width, setWidth] = useState<OptionType>(defaultArticleState.contentWidth);
	const formRef = useRef<HTMLFormElement | null>(null);

	const handleChangeState = (option: ArticleStateType) => setAppState?.(option);

	function toggleSidebar () {
		isOpen ? setIsOpen(false) : setIsOpen(true);
	}

	useEffect (() => {
		if (formRef) {
			formRef.current?.addEventListener('submit', (event) => {
				event.preventDefault();
				handleChangeState({
					fontFamilyOption: family,
					fontSizeOption: size,
					fontColor: fontColor,
					backgroundColor: backgroundColor,
					contentWidth: width
				});
			});

			formRef.current?.addEventListener('reset', () => {
				handleChangeState(defaultArticleState);

				setFamily(defaultArticleState.fontFamilyOption);
				setSize(defaultArticleState.fontSizeOption);
				setFontColor(defaultArticleState.fontColor);
				setBackgroundColor(defaultArticleState.backgroundColor);
				setWidth(defaultArticleState.contentWidth);
			});
		}
	});

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleSidebar} />

			<aside className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form} ref={formRef}>
					<Text as='h2' size={31} weight={800} uppercase dynamicLite>
						Задайте параметры
					</Text>
					<Select selected={family} options={fontFamilyOptions} title='Шрифт' onChange={setFamily}/>
					<RadioGroup name='name' options={fontSizeOptions} selected={size} title='Размер шрифта' onChange={setSize}/>
					<Select selected={fontColor} options={fontColors} title='Цвет шрифта' onChange={setFontColor}/>
					<Separator/>
					<Select selected={backgroundColor} options={backgroundColors} title='Цвет фона' onChange={setBackgroundColor}/>
					<Select selected={width} options={contentWidthArr} title='Ширина контента' onChange={setWidth}/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
