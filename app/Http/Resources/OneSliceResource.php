<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class OneSliceResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            "id" => $this->resource->id,
            "create_date" => $this->resource->create_date,
            "sections" => [
            "health" => $this->resource->health,
            "job" => $this->resource->job,
            "environment" => $this->resource->environment,
            "relationships" => $this->resource->relationships,
            "rest" => $this->resource->rest,
            "development" => $this->resource->development,
            "realization" => $this->resource->realization,
            "spirituality" => $this->resource->spirituality,
            ]
        ];
    }
}
