package models

type TP struct {
	ID    uint   `json:"id" gorm:"primaryKey"`
	Title string `json:"title"`
	SubTitle string `json:"subtitle"`
	Date string `json:"date"`
	Deadline string `json:"deadline"`
	Category string `json:"category"`
	Description string `json:"description"`
}
