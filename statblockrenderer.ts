import { MarkdownRenderChild, MarkdownRenderer } from "obsidian";

export class StatblockRenderer extends MarkdownRenderChild {
	statblockEl: HTMLDivElement;

	constructor(containerEl: HTMLElement, context: string, private params: any) {
		super(containerEl);

		this.statblockEl = this.containerEl.createDiv({ cls: "statblock-tor2e" });

		// this.statblockEl.createDiv({ cls: "fl-r em", text: params.source });
		this.statblockEl.createEl("h2", { cls: "nomargin bold caps", text: params.name });

		// Calling, Culture
		if (params.calling != undefined && params.culture != undefined) {
			this.statblockEl.createEl("h2", {cls: "em", text: `${params.calling}, ${params.culture}` })
		}

		// Features
		const topSectionEl = this.statblockEl.createEl("section");
		if (params.features !== undefined) {
			 MarkdownRenderer.renderMarkdown(params.features.join(", "), topSectionEl, context, this);
		}

		// Stats
		const statsEl = this.statblockEl.createDiv({ cls: 'clear' });
		const strengthTn = 20 - params.strength;
		diamond(statsEl, "Strength", bonus(params.strength));
		
	}
}

function bonus(stat: number | string): string {
	if (stat === 0) return stat.toString();
	return stat > 0 ? `+${stat}` : `${stat}`;
}

function diamond(containerEl: HTMLElement, label: string, text: string) {
	const diamondContainerEl = containerEl.createDiv({ cls: "attr-diamond-container" });
	diamondContainerEl.createDiv({ cls: "sc accent bold attr-diamond-label", text: label });
	const diamond = diamondContainerEl.createDiv({cls: "attr-diamond"});
	return diamond.createDiv({cls: "attr-diamond-text bold accent", text: text });
}
