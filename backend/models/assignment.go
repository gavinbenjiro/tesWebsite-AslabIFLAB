package models

type Assignment struct {
	ID    uint   `json:"id" gorm:"primaryKey"`
	Title string `json:"title"`
	PDFPath  string `json:"pdf_path"`
}
