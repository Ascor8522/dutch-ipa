import { useId, useRef } from 'react';

interface IpaChipProps {
	ipa: string | null;
	word: string;
}


export default function IpaChip({ ipa, word }: IpaChipProps) {
	const tooltipId = useId();
	const anchorName = `--ipa-${tooltipId.replace(/:/g, '')}`;
	const tooltipRef = useRef<HTMLSpanElement>(null);

	const showTooltip = () => {
		if(!tooltipRef.current || tooltipRef.current.matches(':popover-open')) return;
		tooltipRef.current.showPopover();
	};

	const hideTooltip = () => {
		if(!tooltipRef.current?.matches(':popover-open')) return;
		tooltipRef.current.hidePopover();
	};

	return (
		<span
			className="ipa-chip inline-flex leading-6 rounded-md border border-zinc-300 bg-white px-2 py-1 dark:border-zinc-600 dark:bg-zinc-900"
			style={{ '--ipa-anchor': anchorName } as React.CSSProperties}
			tabIndex={0}
			aria-describedby={tooltipId}
			onMouseEnter={showTooltip}
			onMouseLeave={hideTooltip}
			onFocus={showTooltip}
			onBlur={hideTooltip}
		>
			{ipa ?? "🤔"}
			<span
				ref={tooltipRef}
				id={tooltipId}
				className="ipa-chip-tooltip rounded-md border border-zinc-700 bg-zinc-900 px-2 py-1 font-sans text-xs text-white shadow-lg dark:border-zinc-200 dark:bg-zinc-100 dark:text-zinc-900"
				popover="hint"
				role="tooltip"
			>
				{ipa === null ? `Unknown IPA - ${word}` : word}
			</span>
		</span>
	);
}
