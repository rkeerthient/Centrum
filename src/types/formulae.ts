export interface ImageThumbnail {
	url: string,
	width: number,
	height: number,
}

export interface Image {
	url: string,
	width: number,
	height: number,
	thumbnails?: ImageThumbnail[],
	alternateText?: string,
}

export interface ComplexImage {
	image: Image,
	details?: string,
	description?: string,
	clickthroughUrl?: string,
}

export interface EntityReference {
	entityId: string,
	name: string,
}

export interface C_supplementFacts {
	name?: string,
	amountPerServing?: string,
	dailyValue?: string,
}

export default interface Ce_formulae {
	landingPageUrl?: string,
	primaryPhoto?: ComplexImage,
	slug?: string,
	description?: string,
	name: string,
	c_directions?: string,
	c_nutrientsToFormulae?: EntityReference[],
	c_otherIngredients?: string,
	c_supplementFacts?: C_supplementFacts[],
	id: string,
}
