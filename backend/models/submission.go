package models

type Submission struct {
	ID           uint   `json:"id" gorm:"primaryKey"`
	AssignmentID uint   `json:"assignment_id"`
	StudentName  string `json:"student_name"`
	FilePath   string `json:"file_path"` 
	Grade        string `json:"grade"`
	Status       string `json:"status"`
	Description string `json:"description"`
}
