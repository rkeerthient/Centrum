export interface EntityReference {
	entityId: string,
	name: string,
}

export default interface Ce_pain {
	name: string,
	c_painToNutrition?: EntityReference[],
	keywords?: string[],
	id: string,
}
