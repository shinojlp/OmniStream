from typing import List, Optional
from pydantic import BaseModel

class Series(BaseModel):
    adult: Optional[bool]
    backdrop_path: Optional[str]
    first_air_date: Optional[str]
    genre_ids: Optional[List[int]]
    id: Optional[int]
    name: Optional[str]
    origin_country: Optional[List[str]]
    original_language: Optional[str]
    original_name: Optional[str]
    overview: Optional[str]
    popularity: Optional[float]
    poster_path: Optional[str]
    vote_average: Optional[float]
    vote_count: Optional[int]
