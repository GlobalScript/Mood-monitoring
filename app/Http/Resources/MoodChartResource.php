<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class MoodChartResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' =>  $this->resource->id,
            'year' => $this->resource->year,
            'month' => $this->resource->month,
            'day' => $this->resource->day,
            'mark' => $this->resource->mark
        ];
    }
}
