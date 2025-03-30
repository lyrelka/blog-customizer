import clsx from 'clsx';
import { useState } from 'react';
import { CSSProperties } from 'react';

import { ArticleStateType } from 'src/constants/articleProps';
import { Article } from 'src/components/article/Article';
import { ArticleParamsForm } from 'src/components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from 'src/constants/articleProps';

import styles from './App.module.scss';

export const App = () => {
	const [appState, setAppState] =
		useState<ArticleStateType>(defaultArticleState);

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': appState.fontFamilyOption.value,
					'--font-size': appState.fontSizeOption.value,
					'--font-color': appState.fontColor.value,
					'--container-width': appState.contentWidth.value,
					'--bg-color': appState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm setAppState={setAppState} />
			<Article />
		</main>
	);
};
