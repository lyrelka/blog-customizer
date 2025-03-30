import { useState, useRef } from 'react';
import clsx from 'clsx';

import { OptionType, ArticleStateType } from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import {
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from './hooks/useOtsideClickClose';
import { useEscClickClose } from './hooks/useEscClickClose';

import styles from './ArticleParamsForm.module.scss';

type TFormProps = {
	setAppState?: (value: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ setAppState }: TFormProps) => {
	const [isSidebarOpen, setSidebarIsOpen] = useState<boolean>(false);
	const [family, setFamily] = useState<OptionType>(
		defaultArticleState.fontFamilyOption
	);
	const [size, setSize] = useState<OptionType>(
		defaultArticleState.fontSizeOption
	);
	const [fontColor, setFontColor] = useState<OptionType>(
		defaultArticleState.fontColor
	);
	const [backgroundColor, setBackgroundColor] = useState<OptionType>(
		defaultArticleState.backgroundColor
	);
	const [width, setWidth] = useState<OptionType>(
		defaultArticleState.contentWidth
	);
	const sidebarRef = useRef<HTMLDivElement | null>(null);

	useOutsideClickClose({
		isOpen: isSidebarOpen,
		rootRef: sidebarRef,
		onChange: setSidebarIsOpen,
	});

	useEscClickClose({
		isOpen: isSidebarOpen,
		rootRef: sidebarRef,
		onChange: setSidebarIsOpen,
	});

	function toggleSidebar() {
		isSidebarOpen ? setSidebarIsOpen(false) : setSidebarIsOpen(true);
	}

	function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
		event.preventDefault();
		setAppState?.({
			fontFamilyOption: family,
			fontSizeOption: size,
			fontColor: fontColor,
			backgroundColor: backgroundColor,
			contentWidth: width,
		});
	}

	function handleReset() {
		setAppState?.(defaultArticleState);

		setFamily(defaultArticleState.fontFamilyOption);
		setSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setWidth(defaultArticleState.contentWidth);
	}

	return (
		<>
			<ArrowButton isOpen={isSidebarOpen} onClick={toggleSidebar} />

			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isSidebarOpen,
				})}
				ref={sidebarRef}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h2' size={31} weight={800} uppercase dynamicLite>
						Задайте параметры
					</Text>
					<Select
						selected={family}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={setFamily}
					/>
					<RadioGroup
						name='name'
						options={fontSizeOptions}
						selected={size}
						title='Размер шрифта'
						onChange={setSize}
					/>
					<Select
						selected={fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={setFontColor}
					/>
					<Separator />
					<Select
						selected={backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={setBackgroundColor}
					/>
					<Select
						selected={width}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={setWidth}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
