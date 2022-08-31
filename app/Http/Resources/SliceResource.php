<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SliceResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'create_date' => $this->resource->create_date,
            'id' => $this->resource->id
        ];
    }
}
