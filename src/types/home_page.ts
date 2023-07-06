export interface EntityReference {
	entityId: string,
	name: string,
}

export default interface Ce_homePage {
	name: string,
	c_homeToGSQuestions?: EntityReference[],
	id: string,
}
