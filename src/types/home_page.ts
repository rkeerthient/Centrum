export interface EntityReference {
	entityId: string,
	name: string,
}

export default interface Ce_homePage {
	slug?: string,
	name: string,
	c_homeToGSQuestions?: EntityReference[],
	id: string,
}
