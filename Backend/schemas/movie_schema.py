from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel, Extra

class ProductionCompany(BaseModel):
    id: Optional[int]
    logo_path: Optional[str]
    name: Optional[str]
    origin_country: Optional[str]

class ProductionCountry(BaseModel):
    iso_3166_1: Optional[str]
    name: Optional[str]

class SpokenLanguage(BaseModel):
    english_name: Optional[str]
    iso_639_1: Optional[str]
    name: Optional[str]

class Genre(BaseModel):
    id: Optional[int]
    name: Optional[str]

class Movie(BaseModel):
    adult: Optional[bool]
    backdrop_path: Optional[str]
    belongs_to_collection: Optional[dict]
    budget: Optional[int]
    genres: Optional[List[Genre]]
    homepage: Optional[str]
    id: Optional[int]
    imdb_id: Optional[str]
    original_language: Optional[str]
    original_title: Optional[str]
    overview: Optional[str]
    popularity: Optional[float]
    poster_path: Optional[str]
    production_companies: Optional[List[ProductionCompany]]
    production_countries: Optional[List[ProductionCountry]]
    release_date: Optional[str]
    revenue: Optional[int]
    runtime: Optional[int]
    spoken_languages: Optional[List[SpokenLanguage]]
    status: Optional[str]
    tagline: Optional[str]
    title: Optional[str]
    video: Optional[bool]
    vote_average: Optional[float]
    vote_count: Optional[int]
